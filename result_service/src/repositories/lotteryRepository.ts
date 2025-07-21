import debug from "debug";
import { Failure } from "../core/Failure";
import Lottery from "../model/lottery";
import { ok, err, Result } from "neverthrow";
import { container, injectable } from "tsyringe";

@injectable()
export default class LotteryRepository {
    async addLottery(lottery: Lottery): Promise<Result<Lottery, Failure>> {
        try {
            const newLottery = await Lottery.create(lottery);
            return ok(newLottery);
        } catch (error: any) {
            debug("error")(`Failed to add lottery: ${lottery.name}. The error is: ${error}`);
            return err(new Failure("Failed to add lottery", 500));
        }
    }

    async getLotteryByName(name: string): Promise<Result<Lottery | null, Failure>> {
        try {
            const lottery = await Lottery.findOne({ name });
            return ok(lottery);
        } catch (error: any) {
            debug("error")(`Failed to get lottery by name: ${name}. The error is: ${error}`);
            return err(new Failure("Failed to get lottery by name", 500));
        }
    }

    async getAllLotteries(): Promise<Result<Lottery[], Failure>> {
        try {
            const lotteries = await Lottery.find();
            return ok(lotteries);
        } catch (error: any) {
            debug("error")(`Failed to get all lotteries. The error is: ${error}`);
            return err(new Failure("Failed to get all lotteries", 500));
        }
    }

    async deleteLotteryById(id: string): Promise<Result<Lottery | null, Failure>> {
        try {
            const lottery = await Lottery.findByIdAndDelete(id);
            if (!lottery) {
                return err(new Failure("Lottery not found", 404));
            }
            return ok(lottery);
        } catch (error: any) {
            debug("error")(`Failed to delete lottery by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to delete lottery by id", 500));
        }
    }
}

container.registerSingleton(LotteryRepository);