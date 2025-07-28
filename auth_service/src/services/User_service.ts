import { inject, singleton } from "tsyringe";
import UserRepository from "../repositories/User_repository";
import User from "../model/User";
import { Result } from "neverthrow";
import { Failure } from "../core/Failure";
import bcrypt from "bcryptjs";
import AddUserDto from "../dto/user/add_user_dto";

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

    async updateUser(user: User): Promise<Result<User, Failure>> {
        return this.userRepository.updateUser(user);
    }

    async deleteUser(id: number): Promise<Result<void, Failure>> {
        return this.userRepository.deleteUser(id);
    }

    async getAllUsers(): Promise<Result<User[], Failure>> {
        return this.userRepository.getAllUsers();
    }
}