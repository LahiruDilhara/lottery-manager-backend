import debug from "debug";
import { Failure } from "../core/Failure";
import { ok, err, Result } from "neverthrow";
import ResultChecker from "../model/resultChecker";
import { singleton } from "tsyringe";

@singleton()
export default class CheckerRepository {

    async addChecker(checker: ResultChecker): Promise<Result<ResultChecker, Failure>> {
        try {
            const newChecker = await ResultChecker.create(checker);
            return ok(newChecker);
        } catch (error: any) {
            console.error(`Failed to add checker: ${checker}. The error is: ${error}`);
            return err(new Failure("Failed to add checker", 500));
        }
    }

    async getCheckerById(id: string): Promise<Result<ResultChecker | null, Failure>> {
        try {
            const checker = await ResultChecker.findById(id);
            return ok(checker);
        } catch (error: any) {
            console.error(`Failed to get checker by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to get checker", 500));
        }
    }

    async getAllCheckers(): Promise<Result<ResultChecker[], Failure>> {
        try {
            const checkers = await ResultChecker.find();
            return ok(checkers);
        } catch (error: any) {
            console.error(`Failed to get all checkers. The error is: ${error}`);
            return err(new Failure("Failed to get all checkers", 500));
        }
    }

    async getCheckersByLotteryCodeId(lotteryCodeId: number): Promise<Result<ResultChecker[], Failure>> {
        try {
            const checkers = await ResultChecker.find({ lotteryCodeId: lotteryCodeId });
            return ok(checkers);
        } catch (error: any) {
            console.error(`Failed to get checkers by lotteryCodeId: ${lotteryCodeId}. The error is: ${error}`);
            return err(new Failure("Failed to get checkers by lotteryCodeId", 500));
        }
    }

    async deleteCheckerById(id: string): Promise<Result<ResultChecker | null, Failure>> {
        try {
            const checker = await ResultChecker.findByIdAndDelete(id);
            if (!checker) {
                return err(new Failure("ResultChecker not found", 404));
            }
            return ok(checker);
        } catch (error: any) {
            console.error(`Failed to delete checker by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to delete checker", 500));
        }
    }

    async updateCheckerById(id: string, updatedData: Partial<ResultChecker>): Promise<Result<ResultChecker, Failure>> {
        try {
            const checker = await ResultChecker.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
            if (!checker) {
                return err(new Failure("ResultChecker not found", 404));
            }
            return ok(checker);
        } catch (error: any) {
            debug("debug")(`Failed to update checker by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to update checker", 500));
        }
    }
}