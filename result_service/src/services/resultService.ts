import { Result } from "neverthrow";
import lResult from "../model/lResult";
import ResultRepository from "../repositories/resultRepository";
import { Failure } from "../core/Failure";
import AddResultDto from "../dto/result/addResultDto";

export default class ResultService {
    resultRepository: ResultRepository = new ResultRepository();

    async addResult(result: AddResultDto): Promise<Result<lResult, Failure>> {
        return this.resultRepository.addResult(result.toModel());
    }

    async getResultByLotteryId(lotteryId: string): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.getResultByLotteryId(lotteryId);
    }

    async getAllResults(): Promise<Result<lResult[], Failure>> {
        return this.resultRepository.getAllResults();
    }

    async deleteResultById(id: string): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.deleteResultById(id);
    }

    async getResultByLotteryIdAndDate(lotteryId: string, date: Date): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.getResultByLotteryIdAndDate(lotteryId, date);
    }

    async getResultByLotteryIdAndDrawNumber(lotteryId: string, drawNumber: number): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.getResultByLotteryIdAndDrawNumber(lotteryId, drawNumber);
    }
}