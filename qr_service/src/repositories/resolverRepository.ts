import { singleton } from "tsyringe";
import Resolver from "../model/Resolver";
import { Result, ok, err } from "neverthrow";
import { Failure } from "../core/Failure";
import { debug } from "debug";


@singleton()
export default class ResolverRepository {
    async addResolver(resolver: Resolver): Promise<Result<Resolver, Failure>> {
        try {
            const newResolver = await Resolver.create(resolver);
            return ok(newResolver);
        } catch (error) {
            debug("error")(`Failed to add resolver: ${resolver.name}. The error is: ${error}`);
            return err(new Failure("Failed to add resolver", 500));
        }
    }

    async getResolversByLotteryCodeId(lotteryCodeId: number): Promise<Result<Resolver[], Failure>> {
        try {
            const resolvers = await Resolver.find({ lotteryCodeId });
            return ok(resolvers);
        } catch (error) {
            debug("error")(`Failed to get resolvers by lottery code id: ${lotteryCodeId}. The error is: ${error}`);
            return err(new Failure("Failed to get resolvers by lottery code id", 500));
        }
    }

    async getAllResolvers(): Promise<Result<Resolver[], Failure>> {
        try {
            const resolvers = await Resolver.find();
            return ok(resolvers);
        } catch (error) {
            debug("error")(`Failed to get all resolvers. The error is: ${error}`);
            return err(new Failure("Failed to get all resolvers", 500));
        }
    }

    async updateResolverById(id: string, resolverData: Partial<Resolver>): Promise<Result<Resolver, Failure>> {
        try {
            const resolver = await Resolver.findByIdAndUpdate(id, resolverData, { new: true });
            if (!resolver) {
                return err(new Failure("Resolver not found", 404));
            }
            return ok(resolver);
        } catch (error) {
            debug("error")(`Failed to update resolver by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to update resolver by id", 500));
        }
    }

    async deleteResolverById(id: string): Promise<Result<Resolver, Failure>> {
        try {
            const resolver = await Resolver.findByIdAndDelete(id);
            if (!resolver) {
                return err(new Failure("Resolver not found", 404));
            }
            return ok(resolver);
        } catch (error) {
            debug("error")(`Failed to delete resolver by id: ${id}. The error is: ${error}`);
            return err(new Failure("Failed to delete resolver by id", 500));
        }
    }
}