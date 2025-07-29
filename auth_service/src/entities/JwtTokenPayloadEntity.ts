import { Result, ok, err } from "neverthrow";
import User from "../model/User";
import { Failure } from "../core/Failure";
import Joi from "joi";

export default class JwtTokenPayloadEntity {
    id!: number;
    name!: string;
    role!: string;

    static fromUser(user: User): JwtTokenPayloadEntity {
        const entity = new JwtTokenPayloadEntity();
        entity.id = user.id;
        entity.name = user.name;
        entity.role = user.role;
        return entity;
    }

    static fromAny(data: any): JwtTokenPayloadEntity {
        const dto: JwtTokenPayloadEntity = Object.assign(new JwtTokenPayloadEntity(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string().max(255).required(),
            role: Joi.string().valid("admin", "user").required(),
        }).unknown(true); // Allow additional properties
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }
}
