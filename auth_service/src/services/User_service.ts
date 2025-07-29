import { inject, singleton } from "tsyringe";
import UserRepository from "../repositories/User_repository";
import User from "../model/User";
import { err, Result } from "neverthrow";
import { Failure } from "../core/Failure";
import bcrypt from "bcryptjs";
import AddUserDto from "../dto/user/add_user_dto";
import UpdateUserDto from "../dto/user/update_user_dto";

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

    async blockUser(id: number): Promise<Result<User, Failure>> {
        const updatedUser = new User();
        updatedUser.blocked = true;
        const resultOrError = await this.userRepository.updateUser(id, updatedUser);
        return resultOrError;
    }

    async unblockUser(id: number): Promise<Result<User, Failure>> {
        const updatedUser = new User();
        updatedUser.blocked = false;
        const resultOrError = await this.userRepository.updateUser(id, updatedUser);
        return resultOrError;
    }
}