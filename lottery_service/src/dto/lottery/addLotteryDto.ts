import Joi from "joi";
import Lottery from "../../model/lottery";
import { Result, err, ok } from "neverthrow";
import { Failure } from '../../core/Failure';

class AddLotteryDto {
    name?: string;
    codeId?: number;

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            name: Joi.string().min(3).max(100).required(),
            codeId: Joi.number().integer().min(1).required()
        });

        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(): Lottery {
        return new Lottery({
            name: this.name,
            codeId: this.codeId
        });
    }

    static fromAny(data: any): AddLotteryDto {
        const dto: AddLotteryDto = Object.assign(new AddLotteryDto(), data);
        return dto;
    }
}


export default AddLotteryDto;