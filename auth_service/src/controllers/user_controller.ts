import { container } from "tsyringe";
import UserService from "../services/User_service";
import AddUserDto from "../dto/user/add_user_dto";
import UserDto from "../dto/user/user_dto";
import UpdateUserDto from "../dto/user/update_user_dto";
import ChangePasswordDto from "../dto/user/change_password_dto";
import ResetPasswordDto from "../dto/user/reset_password_dto";
import BlockUserDto from "../dto/user/block_user_dto";
import RestorePasswordDto from "../dto/user/restore_password_dto";
import SignInDto from "../dto/user/sign_in_dto";
import JwtTokenDto from "../dto/user/jwt_token";

const service = container.resolve(UserService);

export default class UserController {
    static async addUser(req: any, res: any) {
        const dto = AddUserDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.addUser(dto);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(201).send(UserDto.fromUser(resultOrError.value));
    }

    static async getUserById(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const resultOrError = await service.getUserById(id);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }

    static async getUserByName(req: any, res: any) {
        const name = req.params.name;
        if (!name) {
            return res.status(400).send({ message: "Invalid user name" });
        }

        const resultOrError = await service.getUserByName(name);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }

    static async updateUser(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const dto = UpdateUserDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.updateUser(id, dto);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }

    static async deleteUser(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const resultOrError = await service.deleteUser(id);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(204).send();
    }

    static async getAllUsers(req: any, res: any) {
        const resultOrError = await service.getAllUsers();

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        const usersDto = resultOrError.value.map(user => UserDto.fromUser(user));
        return res.status(200).send(usersDto);
    }

    static async changePassword(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const dto = ChangePasswordDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.changePassword(id, dto);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }

    static async setResetPassword(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const dto = ResetPasswordDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.setResetPassword(id, dto.resetPassword);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }

    static async setBlockUser(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const dto = BlockUserDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.setBlockUser(id, dto.blockUser);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }

    static async restorePassword(req: any, res: any) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send({ message: "Invalid user ID" });
        }

        const dto = RestorePasswordDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.restorePassword(id, dto.password);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(UserDto.fromUser(resultOrError.value));
    }

    static async signUp(req: any, res: any) {
        const dto = AddUserDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.signUp(dto);
        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(201).send(new JwtTokenDto(resultOrError.value));
    }

    static async signIn(req: any, res: any) {
        const dto = SignInDto.fromAny(req.body);
        const result = dto.isValid();
        if (result.isErr()) {
            return res.status(result.error.code).send(result.error);
        }

        const resultOrError = await service.signIn(dto.name, dto.password);

        if (resultOrError.isErr()) {
            return res.status(resultOrError.error.code).send(resultOrError.error);
        }
        return res.status(200).send(new JwtTokenDto(resultOrError.value));
    }

}