import { LotteryController } from '../controllers/lotteryController';
import AddLotteryDto from '../dto/lottery/addLotteryDto';
import LotteryRepository from '../repositories/lotteryRepository';
import express from 'express';

const lotteryRouter = express.Router();

lotteryRouter.get("/", LotteryController.getAllLotteries);
lotteryRouter.post("/", LotteryController.createLottery);
lotteryRouter.get("/:name", LotteryController.getLotteryByName);
lotteryRouter.delete("/:id", LotteryController.deleteLotteryById);

export default lotteryRouter;

