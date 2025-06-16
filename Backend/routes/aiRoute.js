import express from 'express';
import { generateSkincareRoutine } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post("/get-routine", generateSkincareRoutine);

export default aiRouter;