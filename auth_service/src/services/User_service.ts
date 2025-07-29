import { inject, singleton } from "tsyringe";
import UserRepository from "../repositories/User_repository";
import User from "../model/User";
import { err, Result } from "neverthrow";
import { Failure } from "../core/Failure";
import bcrypt from "bcryptjs";
import AddUserDto from "../dto/user/add_user_dto";
import UpdateUserDto from "../dto/user/update_user_dto";
import ChangePasswordDto from "../dto/user/change_password_dto";

@singleton()
export default class UserService {
    constructor(@inject(UserRepository) private userRepository: UserRepository) { }

    async addUser(user: AddUserDto): Promise<Result<User, Failure>> {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const userModel = user.toModel(hashedPassword);

        const usert = await this.userRepository.addUser(userModel);
        return usert;
    }

    async getUserById(id: number): Promise<Result<User, Failure>> {
        return this.userRepository.getUserById(id);
    }

    async getUserByName(name: string): Promise<Result<User, Failure>> {
        return this.userRepository.getUserByName(name);
    }

    async updateUser(id: number, user: UpdateUserDto): Promise<Result<User, Failure>> {
        const updatedUser = new User();
        Object.assign(updatedUser, user);
        return this.userRepository.updateUser(id, updatedUser);
    }

    async deleteUser(id: number): Promise<Result<void, Failure>> {
        return this.userRepository.deleteUser(id);
    }

    async getAllUsers(): Promise<Result<User[], Failure>> {
        return this.userRepository.getAllUsers();
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<Result<User, Failure>> {
        const userOrError = await this.userRepository.getUserById(id);
        if (userOrError.isErr()) {
            return err(userOrError.error);
        }

        const user = userOrError.value;
        const isMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
        if (!isMatch) {
            return err(new Failure("Old password is incorrect", 401));
        }

        const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
        user.password = hashedNewPassword;

        const resultOrError = await this.userRepository.updateUser(id, user);
        return resultOrError;
    }

    async setResetPassword(id: number, canReset: boolean): Promise<Result<User, Failure>> {
        const userOrError = await this.userRepository.getUserById(id);
        if (userOrError.isErr()) {
            return err(userOrError.error);
        }

        const user = userOrError.value;
        user.canResetPassword = canReset;

        const resultOrError = await this.userRepository.updateUser(id, user);
        return resultOrError;
    }

    async setBlockUser(id: number, block: boolean): Promise<Result<User, Failure>> {
        const userOrError = await this.userRepository.getUserById(id);
        if (userOrError.isErr()) {
            return err(userOrError.error);
        }

        const user = userOrError.value;
        user.blocked = block;

        const resultOrError = await this.userRepository.updateUser(id, user);
        return resultOrError;
    }
}