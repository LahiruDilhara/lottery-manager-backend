import { err, ok, Result } from "neverthrow";
import AddLotteryDto from "../dto/lottery/addLotteryDto";
import { Failure } from "../core/Failure";
import LotteryRepository from '../repositories/lotteryRepository';
import Lottery from "../model/lottery";
import { container, inject, injectable } from "tsyringe";

@injectable()
export default class LotteryService {
    constructor(@inject(LotteryRepository) private lotteryRepository: LotteryRepository) { }

    async createLottery(dto: AddLotteryDto): Promise<Result<Lottery, Failure>> {
        let lottery = await this.lotteryRepository.addLottery(dto.toModel());

        return lottery;
    }

    async getLotteryByName(name: string): Promise<Result<Lottery | null, Failure>> {
        return this.lotteryRepository.getLotteryByName(name);
    }

    async getAllLotteries(): Promise<Result<Lottery[], Failure>> {
        return this.lotteryRepository.getAllLotteries();
    }

    async deleteLotteryById(id: string): Promise<Result<Lottery | null, Failure>> {
        return this.lotteryRepository.deleteLotteryById(id);
    }
}


container.registerSingleton(LotteryService);