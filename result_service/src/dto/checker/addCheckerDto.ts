import { Result, ok, err } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import ResultChecker from "../../model/resultChecker";

class AddCheckerDto {
    description?: string;
    lotteryId?: string;
    checker?: any;

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            description: Joi.string().min(3).max(1000).required(),
            lotteryId: Joi.string().required(),
            checker: Joi.object().required()
        });

        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(): ResultChecker {
        return new ResultChecker({
            description: this.description,
            lottery: this.lotteryId,
            checker: this.checker,
        });
    }

    static fromAny(data: any): AddCheckerDto {
        const dto: AddCheckerDto = Object.assign(new AddCheckerDto(), data);
        return dto;
    }
}

export default AddCheckerDto;