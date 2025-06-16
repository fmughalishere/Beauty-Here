import express from 'express';
import multer from 'multer';
import {
  loginUser,
  registerUser,
  updateUser,
  uploadAvatar
} from '../controllers/userController.js';
import authMiddleware from '../Middleware/Auth.js';

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads', 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage });

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.put('/update', authMiddleware, updateUser);

userRouter.post('/upload-avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

export default userRouter;
