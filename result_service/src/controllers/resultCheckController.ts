import LotteryDto from "../dto/resultChecke/lotteryDto";
import ResultCheckService from "../services/resultCheckService";
import { Request, Response } from "express";

const service = new ResultCheckService();
export class ResultCheckController {
    static async checkResults(req: Request, res: Response) {
        const dto = LotteryDto.fromAny(req.body);
        const validationResult = dto.isValid();

        if (validationResult.isErr()) {
            return res.status(validationResult.error.code).send(validationResult.error);
        }
        const resultOrError = await service.checkResults(dto.lotteryId!, dto.drawNumber!, dto.data!);
        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(resultOrError.value);
    }
}