import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";

export default class BlockUserDto {
    blockUser!: boolean;

    static fromAny(data: any): BlockUserDto {
        const dto: BlockUserDto = Object.assign(new BlockUserDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            blockUser: Joi.boolean().required(),
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
