import express from 'express';
import { CheckerController } from '../controllers/checkerController';

const checkerRouter = express.Router();

checkerRouter.get("/", CheckerController.getAllCheckers);
checkerRouter.post("/", CheckerController.createChecker);
checkerRouter.get("/:id", CheckerController.getCheckerById);
checkerRouter.get("/lottery/:lotteryId", CheckerController.getCheckerByLotteryId);
checkerRouter.delete("/:id", CheckerController.deleteCheckerById);

export default checkerRouter;