import express from 'express';
import { CheckerController } from '../controllers/checkerController';

const checkerRouter = express.Router();

checkerRouter.get("/", CheckerController.getAllCheckers);
checkerRouter.post("/", CheckerController.createChecker);
checkerRouter.get("/:id", CheckerController.getCheckerById);
checkerRouter.get("/lottery/:lotteryCodeId", CheckerController.getCheckerByLotteryCodeId);
checkerRouter.delete("/:id", CheckerController.deleteCheckerById);
checkerRouter.patch("/:id", CheckerController.updateCheckerById);

export default checkerRouter;