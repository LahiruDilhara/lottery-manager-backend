import { LotteryController } from '../controllers/lotteryController';
import AddLotteryDto from '../dto/lottery/addLotteryDto';
import LotteryRepository from '../repositories/lotteryRepository';
import express from 'express';

const lotteryRouter = express.Router();

lotteryRouter.get("/", LotteryController.getAllLotteries);
lotteryRouter.post("/", LotteryController.createLottery);

export default lotteryRouter;

