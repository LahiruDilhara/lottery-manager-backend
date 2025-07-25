import { Result, err, ok } from "neverthrow";
import ResultRepository from "../repositories/resultRepository";
import { Failure } from "../core/Failure";
import ResultChecker from "../model/resultChecker";
import { inject, singleton } from "tsyringe";
import { ScriptRunnerService } from "./ScriptRunnerService";
import CheckerRepository from '../repositories/checkerRepository';

@singleton()
export default class ResultCheckService {
    constructor(@inject(ResultRepository) private resultRepository: ResultRepository, @inject(CheckerRepository) private checkerRepository: CheckerRepository, @inject(ScriptRunnerService) private scriptRunner: ScriptRunnerService) { }

    async checkResults(lotteryCodeId: number, drawNumber: number, lotteryData: Object): Promise<Result<Object, Failure>> {
        const resultOrError = await this.resultRepository.getResultByLotteryCodeIdAndDrawNumber(lotteryCodeId, drawNumber);
        if (resultOrError.isErr()) return err(resultOrError.error);
        const result = resultOrError.value;
        if (!(result instanceof Object)) {
            return err(new Failure("Checker not found for the given lotteryCodeId and drawNumber", 500));
        }
        if (!(result.checker instanceof ResultChecker) || !result.checker._id) {
            return err(new Failure("No checker associated with this result", 500));
        }
        const checker = result.checker;
        const script = checker.script;

        const inputObj = {
            result: result.data,
            lottery: lotteryData
        }
        const outputObj = {};
        try {
            await this.scriptRunner.runScript(script, inputObj, outputObj);
            return ok(outputObj);
        } catch (error) {
            return err(new Failure("Error applying checker logic", 400));
        }
    }
}