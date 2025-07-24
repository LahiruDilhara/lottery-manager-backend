import { Result, ok, err } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import ResultChecker from "../../model/resultChecker";
import { Types } from "mongoose";

export default class UpdateCheckerDto {
    description?: string;
    lotteryCodeId?: number;
    script?: string;

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            description: Joi.string().min(3).max(1000),
            lotteryCodeId: Joi.number().integer().min(1),
            script: Joi.string()
        });

        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(checkerId: string): ResultChecker {
        return new ResultChecker({
            _id: new Types.ObjectId(checkerId),
            description: this.description,
            lotteryCodeId: this.lotteryCodeId,
            script: this.script,
        });
    }

    static fromAny(data: any): UpdateCheckerDto {
        const dto: UpdateCheckerDto = Object.assign(new UpdateCheckerDto(), data);
        return dto;
    }
}