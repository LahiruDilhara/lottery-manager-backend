import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import User, { UserRole } from "../../model/User";

export default class UpdateUserDto {
    name?: string;
    description?: string;

    static fromAny(data: any): UpdateUserDto {
        const dto: UpdateUserDto = Object.assign(new UpdateUserDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            name: Joi.string().max(255).optional(),
            description: Joi.string().max(1000).optional(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
