import { err, ok, Result } from "neverthrow";
import AddLotteryDto from "../dto/lottery/addLotteryDto";
import { Failure } from "../core/Failure";
import LotteryRepository from '../repositories/lotteryRepository';
import Lottery from "../model/lottery";

class LotteryService {
    lotteryRepository: LotteryRepository = new LotteryRepository();

    async createLottery(dto: AddLotteryDto): Promise<Result<Lottery, Failure>> {
        const validationResult = dto.isValid();

        if (validationResult.isErr()) {
            return err(validationResult.error);
        }

        let lottery = await this.lotteryRepository.addLottery(dto);

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
