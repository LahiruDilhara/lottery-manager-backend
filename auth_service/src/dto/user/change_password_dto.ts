import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";

export default class ChangePasswordDto {
    oldPassword!: string;
    newPassword!: string;

    static fromAny(data: any): ChangePasswordDto {
        const dto: ChangePasswordDto = Object.assign(new ChangePasswordDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            oldPassword: Joi.string().min(8).max(255).required(),
            newPassword: Joi.string().min(8).max(255).required(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
