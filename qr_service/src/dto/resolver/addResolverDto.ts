import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import Resolver from "../../model/Resolver";

export default class AddresolverDto {
    name?: string;
    description?: string;
    pattern?: string;
    script?: string;
    lotteryCodeId?: number;

    static fromAny(data: any): AddresolverDto {
        const dto: AddresolverDto = Object.assign(new AddresolverDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            name: Joi.string().max(255).optional(),
            description: Joi.string().max(1000).optional(),
            pattern: Joi.string().max(500).required(),
            script: Joi.string().required(),
            lotteryCodeId: Joi.number().integer().required()
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(): Resolver {
        return new Resolver({
            name: this.name,
            description: this.description,
            pattern: this.pattern,
            script: this.script,
            lotteryCodeId: this.lotteryCodeId
        });
    }
}
