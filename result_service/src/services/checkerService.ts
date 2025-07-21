import { Result } from "neverthrow";
import CheckerRepository from "../repositories/checkerRepository";
import { Failure } from "../core/Failure";
import AddCheckerDto from "../dto/checker/addCheckerDto";
import ResultChecker from "../model/resultChecker";
import { inject, singleton } from "tsyringe";

@singleton()
export default class CheckerService {
    constructor(@inject(CheckerRepository) private checkerRepository: CheckerRepository) { }

    async addChecker(addCheckerDto: AddCheckerDto): Promise<Result<ResultChecker, Failure>> {
        const dto = addCheckerDto.toModel();
        return this.checkerRepository.addChecker(dto);
    }
    async getCheckerById(id: string): Promise<Result<ResultChecker | null, Failure>> {
        return this.checkerRepository.getCheckerById(id);
    }
    async getAllCheckers(): Promise<Result<ResultChecker[], Failure>> {
        return this.checkerRepository.getAllCheckers();
    }

    async getCheckersByLotteryId(lotteryId: string): Promise<Result<ResultChecker[], Failure>> {
        return this.checkerRepository.getCheckersByLotteryId(lotteryId);
    }

    async deleteCheckerById(id: string): Promise<Result<ResultChecker | null, Failure>> {
        return this.checkerRepository.deleteCheckerById(id);
    }
}