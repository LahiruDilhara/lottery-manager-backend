import LotteryRepository from '../repositories/lotteryRepository';
import express, { Request, Response } from 'express';

const lotteryRouter = express.Router();
const repository = new LotteryRepository();

lotteryRouter.get('/', async (req: express.Request, res: express.Response) => {
    let lotteriesOrError = await repository.getAllLotteries();
    if (lotteriesOrError.isErr()) {
        return res.status(lotteriesOrError.error.code).send(lotteriesOrError.error);
    }
    res.status(200).send(lotteriesOrError.value);
});


export default lotteryRouter;

