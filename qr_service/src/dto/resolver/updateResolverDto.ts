import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import Resolver from "../../model/Resolver";
import { Types } from "mongoose";

export default class UpdateResolverDto {
    name?: string;
    description?: string;
    pattern?: string;
    script?: string;
    lotteryCodeId?: number;

    static fromAny(data: any): UpdateResolverDto {
        const dto: UpdateResolverDto = Object.assign(new UpdateResolverDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            name: Joi.string().max(255),
            description: Joi.string().max(1000),
            pattern: Joi.string().max(500),
            script: Joi.string(),
            lotteryCodeId: Joi.number().integer()
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(resolverId: string): Resolver {
        return new Resolver({
            _id: new Types.ObjectId(resolverId),
            name: this.name,
            description: this.description,
            pattern: this.pattern,
            script: this.script,
            lotteryCodeId: this.lotteryCodeId
        });
    }
}
