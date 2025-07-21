import { container, injectable } from "tsyringe";
import AddLotteryDto from "../dto/lottery/addLotteryDto";
import LotteryService from "../services/lotteryService";
import { Request, Response } from "express";

const service = container.resolve(LotteryService);

export class LotteryController {
    static async getAllLotteries(req: Request, res: Response) {
        let lotteriesOrError = await service.getAllLotteries();
        if (lotteriesOrError.isErr()) {
            return res.status(lotteriesOrError.error.code).send(lotteriesOrError.error);
        }
        return res.status(200).send(lotteriesOrError.value);
    }

    static async createLottery(req: Request, res: Response) {
        const dto = AddLotteryDto.fromAny(req.body);
        const result = dto.isValid();

        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        let lotteryOrError = await service.createLottery(dto);

        if (lotteryOrError.isErr()) {
            return res.status(lotteryOrError.error.code).send(lotteryOrError.error);
        }
        return res.status(201).send(lotteryOrError.value);
    }

    static async getLotteryByName(req: Request, res: Response) {
        const name = req.params.name;
        let lotteryOrError = await service.getLotteryByName(name);

        if (lotteryOrError.isErr()) {
            return res.status(lotteryOrError.error.code).send(lotteryOrError.error);
        }
        return res.status(200).send(lotteryOrError.value);
    }

    static async deleteLotteryById(req: Request, res: Response) {
        const id = req.params.id;
        let lotteryOrError = await service.deleteLotteryById(id);

        if (lotteryOrError.isErr()) {
            return res.status(lotteryOrError.error.code).send(lotteryOrError.error);
        }
        return res.status(200).send(lotteryOrError.value);
    }
}