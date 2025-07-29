import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";

export default class ResetPasswordDto {
    resetPassword!: boolean;

    static fromAny(data: any): ResetPasswordDto {
        const dto: ResetPasswordDto = Object.assign(new ResetPasswordDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            resetPassword: Joi.boolean().required(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
