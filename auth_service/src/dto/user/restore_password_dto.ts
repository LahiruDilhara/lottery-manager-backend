import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";

export default class RestorePasswordDto {
    password!: string;

    static fromAny(data: any): RestorePasswordDto {
        const dto: RestorePasswordDto = Object.assign(new RestorePasswordDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            password: Joi.string().min(8).max(255).required(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
