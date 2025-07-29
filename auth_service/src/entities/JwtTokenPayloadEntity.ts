import { Result, err, ok } from "neverthrow";
import Joi from "joi";
import User from "../model/User";

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
}
