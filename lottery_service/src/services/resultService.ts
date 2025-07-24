import { Result } from "neverthrow";
import lResult from "../model/lResult";
import ResultRepository from "../repositories/resultRepository";
import { Failure } from "../core/Failure";
import AddResultDto from "../dto/result/addResultDto";
import { inject, singleton } from "tsyringe";

@singleton()
export default class ResultService {
    constructor(@inject(ResultRepository) private resultRepository: ResultRepository) { }

    async addResult(result: AddResultDto): Promise<Result<lResult, Failure>> {
        return this.resultRepository.addResult(result.toModel());
    }

    async getResultsByLotteryCodeId(lotteryCodeId: number): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.getResultsByLotteryCodeId(lotteryCodeId);
    }

    async getAllResults(): Promise<Result<lResult[], Failure>> {
        return this.resultRepository.getAllResults();
    }

    async deleteResultById(id: string): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.deleteResultById(id);
    }

    async getResultByLotteryCodeIdAndDate(lotteryCodeId: number, date: Date): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.getResultByLotteryCodeIdAndDate(lotteryCodeId, date);
    }

    async getResultByLotteryCodeIdAndDrawNumber(lotteryCodeId: number, drawNumber: number): Promise<Result<lResult | null, Failure>> {
        return this.resultRepository.getResultByLotteryCodeIdAndDrawNumber(lotteryCodeId, drawNumber);
    }

    async updateResultById(id: string, updatedData: Partial<lResult>): Promise<Result<lResult, Failure>> {
        return this.resultRepository.updateResultById(id, updatedData);
    }
}