import { Result, err, ok } from "neverthrow";
import ResultRepository from "../repositories/resultRepository";
import { Failure } from "../core/Failure";
import jsonLogic from "json-logic-js";
import ResultChecker from "../model/resultChecker";
import { container, inject, injectable } from "tsyringe";

@injectable()
export default class ResultCheckService {
    constructor(@inject(ResultRepository) private resultRepository: ResultRepository) { }

    async checkResults(lotteryId: string, drawNumber: number, lotteryData: Object): Promise<Result<Object, Failure>> {
        return err(new Failure("Result checking is not implemented yet", 501));
        // const resultOrError = await this.resultRepository.getResultByLotteryIdAndDrawNumber(lotteryId, drawNumber);
        // if (resultOrError.isErr()) return err(resultOrError.error);
        // const result = resultOrError.value;
        // if (!(result instanceof Object)) {
        //     return err(new Failure("Checker not found for the given lotteryId and drawNumber"));
        // }
        // const checker = result.checker as ResultChecker;

        // const inputObj = {
        //     result: result.data,
        //     lottery: lotteryData
        // }
        // try {
        //     // console.log(inputObj)
        //     const checkedResult = jsonLogic.apply(checker.script, inputObj);
        //     return ok(checkedResult);
        // } catch (error) {
        //     return err(new Failure("Error applying checker logic", 400));
        // }
    }
}


container.registerSingleton(ResultCheckService);