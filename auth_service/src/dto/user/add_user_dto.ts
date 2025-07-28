import { Result, err, ok } from "neverthrow";
import { Failure } from "../../core/Failure";
import Joi from "joi";
import User, { UserRole } from "../../model/User";

export default class AddUserDto {
    name!: string;
    description?: string;
    role!: string;
    password!: string;


    static fromAny(data: any): AddUserDto {
        const dto: AddUserDto = Object.assign(new AddUserDto(), data);
        return dto;
    }

    isValid(): Result<void, Failure> {
        const schema = Joi.object({
            name: Joi.string().max(255).required(),
            description: Joi.string().max(1000).optional(),
            role: Joi.string().valid("admin", "user").required(),
            password: Joi.string().min(8).max(255).required()
        });
        const { error } = schema.validate(this);
        if (error) {
            return err(Failure.fromJoiError(error, 400));
        }
        return ok(undefined);
    }

    toModel(hashedPassword: string): User {
        const user = new User();
        user.name = this.name;
        user.description = this.description;
        user.role = UserRole[this.role.toUpperCase() as keyof typeof UserRole];
        user.password = hashedPassword;
        return user;
    }
}
