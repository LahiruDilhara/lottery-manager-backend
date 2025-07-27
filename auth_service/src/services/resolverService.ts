import { inject, singleton } from "tsyringe";
import ResolverRepository from "../repositories/resolverRepository";
import Resolver from "../model/Resolver";
import { Result } from "neverthrow";
import { Failure } from "../core/Failure";

@singleton()
export default class ResolverService {
    constructor(@inject(ResolverRepository) private resolverRepository: ResolverRepository) { }

    async addResolver(resolver: Resolver): Promise<Result<Resolver, Failure>> {
        return this.resolverRepository.addResolver(resolver);
    }

    async updateResolverById(id: string, resolverData: Partial<Resolver>): Promise<Result<Resolver, Failure>> {
        return this.resolverRepository.updateResolverById(id, resolverData);
    }
    async getResolversByLotteryCodeId(lotteryCodeId: number): Promise<Result<Resolver[], Failure>> {
        return this.resolverRepository.getResolversByLotteryCodeId(lotteryCodeId);
    }
    async getAllResolvers(): Promise<Result<Resolver[], Failure>> {
        return this.resolverRepository.getAllResolvers();
    }
    async deleteResolverById(id: string): Promise<Result<Resolver, Failure>> {
        return this.resolverRepository.deleteResolverById(id);
    }

}