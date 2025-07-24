import express from 'express';
import { ResultController } from '../controllers/resultController';

const resultRouter = express.Router();

resultRouter.get("/", ResultController.getAllResults);
resultRouter.post("/", ResultController.createResult);
resultRouter.get("/:lotteryCodeId", ResultController.getResultsByLotteryCodeId);
resultRouter.get("/:lotteryCodeId/:date", ResultController.getResultByLotteryCodeIdAndDate);
resultRouter.get("/:lotteryCodeId/draw/:drawNumber", ResultController.getResultByLotteryCodeIdAndDrawNumber);
resultRouter.delete("/:id", ResultController.deleteResultById);
resultRouter.patch("/:id", ResultController.updateResultById);

export default resultRouter;