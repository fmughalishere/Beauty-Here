import express from 'express';
import { generateSkincareRoutine, chatWithGlo } from '../controllers/aiController.js'; 

const aiRouter = express.Router();
aiRouter.post('/get-routine', generateSkincareRoutine);
aiRouter.post('/chat', chatWithGlo);

export default aiRouter;