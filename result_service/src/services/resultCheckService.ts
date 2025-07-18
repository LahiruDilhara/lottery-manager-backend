import { Result, err, ok } from "neverthrow";
import ResultRepository from "../repositories/resultRepository";
import { Failure } from "../core/Failure";
import jsonLogic from "json-logic-js";
import ResultChecker from "../model/resultChecker";
import { debug } from "console";

export default class ResultCheckService {
    resultRepository: ResultRepository = new ResultRepository();

    async checkResults(lotteryId: string, drawNumber: number, lotteryData: Object): Promise<Result<Object, Failure>> {
        const resultOrError = await this.resultRepository.getResultByLotteryIdAndDrawNumber(lotteryId, drawNumber);
        if (resultOrError.isErr()) return err(resultOrError.error);
        const result = resultOrError.value;
        if (!(result instanceof Object)) {
            return err(new Failure("Checker not found for the given lotteryId and drawNumber"));
        }
        const checker = result.checker as ResultChecker;

        const inputObj = {
            result: result.data,
            lottery: lotteryData
        }
        try {
            // console.log(inputObj)
            const checkedResult = jsonLogic.apply(checker.checker, inputObj);
            return ok(checkedResult);
        } catch (error) {
            return err(new Failure("Error applying checker logic", 400));
        }
    }
}