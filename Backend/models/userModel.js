import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    cartData: { type: Object, default: {} },
    role: { type: String, default: "user" } 
  },
  { minimize: false }
);

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;