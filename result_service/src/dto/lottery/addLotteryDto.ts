import Joi from "joi";
import Lottery from "../../model/lottery";
import { Result, err, ok } from "neverthrow";
import { Failure } from '../../core/Failure';

class AddLotteryDto extends Lottery {
    constructor(name: string) {
        super();
        this.name = name;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            name: Joi.string().min(3).max(100).required()
        });

        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}


export default AddLotteryDto;