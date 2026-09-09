import express from 'express';
import {
  loginUser,
  registerUser,
  updateUser,
  uploadAvatar,
  googleLogin
} from '../controllers/userController.js';
import authMiddleware from '../Middleware/Auth.js';
import upload from '../Middleware/multer.js';

const userRouter = express.Router();
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/google-login', googleLogin);
userRouter.put('/update', authMiddleware, updateUser);
userRouter.post('/upload-avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

export default userRouter;
