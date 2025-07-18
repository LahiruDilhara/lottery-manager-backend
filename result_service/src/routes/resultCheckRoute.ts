import express from 'express';
import { ResultCheckController } from '../controllers/resultCheckController';

const resultCheckRouter = express.Router();

resultCheckRouter.post("/", ResultCheckController.checkResults);

export default resultCheckRouter;