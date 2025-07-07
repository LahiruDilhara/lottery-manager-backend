import express from 'express';
import { ResultController } from '../controllers/resultController';

const resultRouter = express.Router();

resultRouter.get("/",ResultController.getAllResults);
resultRouter.post("/", ResultController.createResult);
resultRouter.get("/:lotteryId", ResultController.getResultByLotteryId);
resultRouter.get("/:lotteryId/:date", ResultController.getResultByLotteryIdAndDate);
resultRouter.get("/:lotteryId/draw/:drawNumber", ResultController.getResultByLotteryIdAndDrawNumber);
resultRouter.delete("/:id", ResultController.deleteResultById);

export default resultRouter;