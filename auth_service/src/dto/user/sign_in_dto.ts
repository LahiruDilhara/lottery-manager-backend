import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";

export default class SignInDto {
    name!: string;
    password!: string;

    static fromAny(data: any): SignInDto {
        const dto: SignInDto = Object.assign(new SignInDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            name: Joi.string().max(255).required(),
            password: Joi.string().min(8).max(255).required()
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
