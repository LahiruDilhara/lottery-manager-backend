import { inject, singleton } from "tsyringe";
import CacheUserDataSource from "../data_source/Cache_user_data_source";
import User from "../model/User";
import { Result, ok, err } from "neverthrow";
import { Failure } from "../core/Failure";
import { DatabaseConnection } from '../startups/database';
import debug from "debug";

@singleton()
export default class UserRepository {
    constructor(@inject(CacheUserDataSource) private cacheUserDataSource: CacheUserDataSource, @inject(DatabaseConnection) private databaseConnection: DatabaseConnection) { }

    async addUser(user: User): Promise<Result<User, Failure>> {
        try {
            const newUser = await this.databaseConnection.getRepository(User).save(user);
            this.cacheUserDataSource.addUser(newUser);
            return ok(newUser);
        } catch (error) {
            debug("error")(`Failed to add user: ${user.name}. The error is: ${error}`);
            this.cacheUserDataSource.removeUser(user.id);
            return err(new Failure("Failed to add user", 500));
        }
    }

    async getUserById(id: number): Promise<Result<User, Failure>> {
        const cachedUser = this.cacheUserDataSource.getUserById(id);
        if (cachedUser) {
            return ok(cachedUser);
        }

        try {
            const user = await this.databaseConnection.getRepository(User).findOneBy({ id });
            if (user) {
                this.cacheUserDataSource.addUser(user);
                return ok(user);
            } else {
                return err(new Failure("User not found", 404));
            }
        } catch (error) {
            debug("error")(`Failed to get user by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to get user", 500));
        }
    }

    async getUserByName(name: string): Promise<Result<User, Failure>> {
        const cachedUser = this.cacheUserDataSource.getUserByName(name);
        if (cachedUser) {
            return ok(cachedUser);
        }

        try {
            const user = await this.databaseConnection.getRepository(User).findOneBy({ name });
            if (user) {
                this.cacheUserDataSource.addUser(user);
                return ok(user);
            } else {
                return err(new Failure("User not found", 404));
            }
        } catch (error) {
            debug("error")(`Failed to get user by name: ${name}. The error is: ${error}`);
            return err(new Failure("Failed to get user", 500));
        }
    }

    async updateUser(id: number, user: User): Promise<Result<User, Failure>> {
        const existingUserOrError = await this.getUserById(id);
        if (existingUserOrError.isErr()) {
            return existingUserOrError;
        }
        const existingUser = existingUserOrError.value;
        Object.assign(existingUser, user);
        try {
            this.cacheUserDataSource.removeUser(id);
            const updatedUser = await this.databaseConnection.getRepository(User).save(existingUser);
            this.cacheUserDataSource.addUser(updatedUser);
            return ok(updatedUser);
        } catch (error) {
            debug("error")(`Failed to update user: ${user.name}. The error is: ${error}`);
            return err(new Failure("Failed to update user", 500));
        }
    }

    async deleteUser(id: number): Promise<Result<void, Failure>> {
        try {
            await this.databaseConnection.getRepository(User).delete(id);
            this.cacheUserDataSource.removeUser(id);
            return ok(undefined);
        } catch (error) {
            debug("error")(`Failed to delete user: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to delete user", 500));
        }
    }

    async getAllUsers(): Promise<Result<User[], Failure>> {
        try {
            const users = await this.databaseConnection.getRepository(User).find();
            users.forEach(user => this.cacheUserDataSource.addUser(user));
            return ok(users);
        } catch (error) {
            debug("error")(`Failed to get all users. The error is: ${error}`);
            return err(new Failure("Failed to get all users", 500));
        }
    }
}