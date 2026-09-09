import multer from 'multer';

// Serverless hosts (Vercel included) don't offer a writable, persistent
// disk, so uploads are kept in memory and converted to base64 data URIs
// in the controllers instead of being written to a local "uploads" folder.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB per image, keeps payloads well under hosting limits
});

export default upload;
