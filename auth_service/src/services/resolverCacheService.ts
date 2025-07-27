// import { inject, singleton } from "tsyringe";
// import Resolver from "../model/Resolver";
// import ResolverRepository from "../repositories/resolverRepository";
// import { debug } from "debug";
// import CacheResolver from "../model/CacheResolver";
// import EventBus from "../core/EventBus";

// @singleton()
// export default class ResolverCacheService {

//     constructor(@inject(ResolverRepository) private resolverRepository: ResolverRepository) {
//         this.loadResolvers();
//         EventBus.on("loadCache", this.loadResolvers.bind(this));
//     }

//     private cache: CacheResolver[] = [];

//     public async loadResolvers(): Promise<void> {
//         const resolversOrError = await this.resolverRepository.getAllResolvers();
//         if (resolversOrError.isErr()) {
//             debug("error")("Failed to load resolvers from repository:", resolversOrError.error);
//             return;
//         }
//         const resolvers = resolversOrError.value;
//         this.cache = resolvers.map((resolver: Resolver) => new CacheResolver({
//             _id: resolver._id,
//             name: resolver.name,
//             description: resolver.description,
//             pattern: resolver.pattern,
//             regex: new RegExp(resolver.pattern),
//             lotteryCodeId: resolver.lotteryCodeId,
//             script: resolver.script,
//         }));
//     }

//     public getCache(): CacheResolver[] {
//         return this.cache;
//     }

// }