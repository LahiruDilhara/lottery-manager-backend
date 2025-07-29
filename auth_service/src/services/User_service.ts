import { inject, singleton } from "tsyringe";
import UserRepository from "../repositories/User_repository";
import User from "../model/User";
import { err, Result, ok } from "neverthrow";
import { Failure } from "../core/Failure";
import bcrypt from "bcryptjs";
import AddUserDto from "../dto/user/add_user_dto";
import UpdateUserDto from "../dto/user/update_user_dto";
import ChangePasswordDto from "../dto/user/change_password_dto";
import JwtTokenService from "./JwtTokenService";

@singleton()
export default class UserService {
    constructor(@inject(UserRepository) private userRepository: UserRepository, @inject(JwtTokenService) private jwtTokenService: JwtTokenService) { }

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

    async restorePassword(id: number, password: string): Promise<Result<User, Failure>> {
        const userOrError = await this.userRepository.getUserById(id);
        if (userOrError.isErr()) {
            return err(userOrError.error);
        }
        const user = userOrError.value;

        if (!user.canResetPassword) {
            return err(new Failure("User cannot reset password", 403));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.canResetPassword = false;

        const resultOrError = await this.userRepository.updateUser(id, user);
        return resultOrError;
    }

    async signUp(user: AddUserDto): Promise<Result<string, Failure>> {
        const addUserResult = await this.addUser(user);
        if (addUserResult.isErr()) {
            return err(addUserResult.error);
        }

        const token = this.jwtTokenService.generateToken(addUserResult.value);
        return ok(token);
    }

    async signIn(name: string, password: string): Promise<Result<string, Failure>> {
        const userOrError = await this.getUserByName(name);
        if (userOrError.isErr()) {
            return err(userOrError.error);
        }

        if (userOrError.value.blocked) {
            return err(new Failure("User is blocked", 403));
        }

        if (userOrError.value.canResetPassword) {
            return err(new Failure("Please reset the password before sign in", 403));
        }

        const user = userOrError.value;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return err(new Failure("Invalid credentials", 401));
        }

        const token = this.jwtTokenService.generateToken(user);
        return ok(token);
    }
}