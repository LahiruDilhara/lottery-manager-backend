import { container } from "tsyringe";
import AddResultDto from "../dto/result/addResultDto";
import ResultService from "../services/resultService";
import { Request, Response } from "express";
import UpdateResultDto from "../dto/result/updateResultDto";
import { Failure } from "../core/Failure";

const service = container.resolve(ResultService);

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

    static async getResultsByLotteryCodeId(req: Request, res: Response) {
        const lotteryCodeId = Number.parseInt(req.params.lotteryCodeId);
        if (isNaN(lotteryCodeId)) {
            return res.status(400).send(new Failure("Invalid lottery code ID", 400));
        }
        let resultOrError = await service.getResultsByLotteryCodeId(lotteryCodeId);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
    static async getResultByLotteryCodeIdAndDate(req: Request, res: Response) {
        const lotteryCodeId = Number.parseInt(req.params.lotteryCodeId);
        if (isNaN(lotteryCodeId)) {
            return res.status(400).send(new Failure("Invalid lottery code ID", 400));
        }
        const date = new Date(req.params.date);
        if (isNaN(date.getTime())) {
            return res.status(400).send(new Failure("Invalid date format", 400));
        }
        let resultOrError = await service.getResultByLotteryCodeIdAndDate(lotteryCodeId, date);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
    static async getResultByLotteryCodeIdAndDrawNumber(req: Request, res: Response) {
        const lotteryCodeId = Number.parseInt(req.params.lotteryCodeId);
        if (isNaN(lotteryCodeId)) {
            return res.status(400).send(new Failure("Invalid lottery code ID", 400));
        }
        const drawNumber = parseInt(req.params.drawNumber, 10);
        if (isNaN(drawNumber)) {
            return res.status(400).send(new Failure("Invalid draw number", 400));
        }
        let resultOrError = await service.getResultByLotteryCodeIdAndDrawNumber(lotteryCodeId, drawNumber);

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

    static async updateResultById(req: Request, res: Response) {
        const dto = UpdateResultDto.fromAny(req.body);
        const id = req.params.id;
        const result = dto.isValid();

        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }
        if (!id) {
            return res.status(400).send(new Failure("ID is required for update", 400));
        }

        const updatedData = dto.toModel(id);
        let resultOrError = await service.updateResultById(id, updatedData);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
}