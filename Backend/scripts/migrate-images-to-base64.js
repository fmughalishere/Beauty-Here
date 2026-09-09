// One-time migration helper.
//
// Before this fix, product photos and user avatars were saved as plain
// filenames on local disk (Backend/uploads). Live hosting doesn't have a
// persistent disk, so new uploads are now saved as base64 data straight
// into MongoDB. This script converts any OLDER records that still hold a
// bare filename into that same base64 format, using the files that are
// still sitting in your local uploads/ folder.
//
// Run this ONCE, locally, from the Backend folder, while your uploads
// folder and .env (with MONGO_URI) are both still on this machine:
//
//   node scripts/migrate-images-to-base64.js

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';

const UPLOADS_DIR = path.resolve('uploads');

const mimeFromExt = (file) => {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  return 'image/jpeg';
};

const toDataUri = (filename) => {
  const filePath = path.join(UPLOADS_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return `data:${mimeFromExt(filename)};base64,${buffer.toString('base64')}`;
};

const isAlreadyMigrated = (value) => !value || value.startsWith('data:') || value.startsWith('http');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB.');

  const products = await productModel.find({});
  const pendingProducts = products.filter((p) => !isAlreadyMigrated(p.image));
  console.log(`Found ${pendingProducts.length} product(s) with a plain filename image.`);
  for (const product of pendingProducts) {
    const dataUri = toDataUri(product.image);
    if (dataUri) {
      product.image = dataUri;
      await product.save();
      console.log(`  updated product ${product._id} (${product.name})`);
    } else {
      console.log(`  skipped product ${product._id} (${product.name}) - file "${product.image}" not found in /uploads`);
    }
  }

  const users = await userModel.find({});
  const pendingUsers = users.filter((u) => !isAlreadyMigrated(u.avatar));
  console.log(`Found ${pendingUsers.length} user avatar(s) with a plain filename image.`);
  for (const user of pendingUsers) {
    const dataUri = toDataUri(user.avatar);
    if (dataUri) {
      user.avatar = dataUri;
      await user.save();
      console.log(`  updated avatar for ${user.email}`);
    } else {
      console.log(`  skipped avatar for ${user.email} - file "${user.avatar}" not found in /uploads`);
    }
  }

  console.log('Done!');
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
