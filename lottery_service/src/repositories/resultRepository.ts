import { ok, err, Result } from "neverthrow";
import lResult from "../model/lResult";
import { Failure } from "../core/Failure";
import { singleton } from "tsyringe";
import debug from "debug";
import { Types } from "mongoose";

@singleton()
export default class ResultRepository {
    async addResult(result: lResult): Promise<Result<lResult, Failure>> {
        try {
            const newResult = await lResult.create(result);
            return ok(newResult);
        } catch (error: any) {
            console.log(typeof error);
            debug("debug")(`Failed to add result: ${result}. The error is: ${error}`);
            return err(new Failure("Failed to add result", 500));
        }
    }

    async getResultByLotteryId(lotteryId: string): Promise<Result<lResult | null, Failure>> {
        try {
            const result = await lResult.findOne({ lottery: lotteryId }).populate("lottery").populate("checker");
            return ok(result);
        } catch (error: any) {
            debug("debug")(`Failed to get result by lottery id: ${lotteryId}. The error is: ${error}`);
            return err(new Failure("Failed to get result", 500));
        }
    }
    async getAllResults(): Promise<Result<lResult[], Failure>> {
        try {
            const results = await lResult.find().populate("lottery").populate("checker");
            return ok(results);
        } catch (error: any) {
            debug("debug")(`Failed to get all results. The error is: ${error}`);
            return err(new Failure("Failed to get all results", 500));
        }
    }
    async deleteResultById(id: string): Promise<Result<lResult | null, Failure>> {
        try {
            const result = await lResult.findByIdAndDelete(id);
            if (!result) {
                return err(new Failure("Result not found", 404));
            }
            return ok(result);
        } catch (error: any) {
            debug("debug")(`Failed to delete result by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to delete result", 500));
        }
    }
    async getResultByLotteryIdAndDate(
        lotteryId: string,
        date: Date
    ): Promise<Result<lResult | null, Failure>> {
        try {
            // Create start and end of the day range
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);

            const end = new Date(date);
            end.setHours(24, 0, 0, 0); // exclusive upper bound

            const result = await lResult.findOne({
                lottery: lotteryId,
                date: { $gte: start, $lt: end },
            }).populate("lottery").populate("checker");

            return ok(result);
        } catch (error: any) {
            debug("debug")(`Failed to get result by lottery id: ${lotteryId} and date: ${date}. The error is: ${error}`);
            return err(new Failure("Failed to get result", 500));
        }
    }
    async getResultByLotteryIdAndDrawNumber(lotteryId: string, drawNumber: number): Promise<Result<lResult, Failure>> {
        try {
            const result = await lResult.findOne({ lottery: lotteryId, drawNumber: drawNumber }).populate("lottery").populate("checker");
            if (result === null) {
                return err(new Failure("Result not found for the given lotteryId and drawNumber", 404));
            }
            return ok(result);
        } catch (error: any) {
            debug("debug")(`Failed to get result by lottery id: ${lotteryId} and draw number: ${drawNumber}. The error is: ${error}`);
            return err(new Failure("Failed to get result", 500));
        }
    }

    async updateResultById(id: string, updatedData: Partial<lResult>): Promise<Result<lResult, Failure>> {
        try {
            const result = await lResult.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
            if (!result) {
                return err(new Failure("Result not found", 404));
            }
            return ok(result);
        } catch (error: any) {
            debug("debug")(`Failed to update result by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to update result", 500));
        }
    }
}