import AddResultDto from "../dto/result/addResultDto";
import ResultService from "../services/resultService";
import { Request, Response } from "express";

const service = new ResultService();

export class ResultController {
    static async getAllResults(req: Request, res: Response) {
        let resultsOrError = await service.getAllResults();
        if (resultsOrError.isErr()) {
            return res.status(resultsOrError.error.code).send(resultsOrError.error);
        }
        return res.status(200).send(resultsOrError.value);
    }

    static async createResult(req: Request, res: Response) {
        const dto = AddResultDto.fromAny(req.body);
        const result = dto.isValid();

        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        let resultOrError = await service.addResult(dto);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(201).send(resultOrError.value);
    }

    static async getResultByLotteryId(req: Request, res: Response) {
        const lotteryId = req.params.lotteryId;
        let resultOrError = await service.getResultByLotteryId(lotteryId);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
    static async getResultByLotteryIdAndDate(req: Request, res: Response) {
        const lotteryId = req.params.lotteryId;
        const date = new Date(req.params.date);
        let resultOrError = await service.getResultByLotteryIdAndDate(lotteryId, date);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
    static async getResultByLotteryIdAndDrawNumber(req: Request, res: Response) {
        const lotteryId = req.params.lotteryId;
        const drawNumber = parseInt(req.params.drawNumber, 10);
        let resultOrError = await service.getResultByLotteryIdAndDrawNumber(lotteryId, drawNumber);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
    

    static async deleteResultById(req: Request, res: Response) {
        const id = req.params.id;
        let resultOrError = await service.deleteResultById(id);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
}