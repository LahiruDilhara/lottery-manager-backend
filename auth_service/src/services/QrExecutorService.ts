import { inject, singleton } from "tsyringe";
import ResolverRepository from "../repositories/resolverRepository";
import { Result, ok, err } from "neverthrow";
import { Failure } from "../core/Failure";
import ResolverCacheService from "./resolverCacheService";
import Resolver from "../model/Resolver";
import { ScriptRunnerService } from "./ScriptRunnerService";

@singleton()
export default class QrExecutorService {
    constructor(@inject(ResolverRepository) private resolverRepository: ResolverRepository, @inject(ResolverCacheService) private resolverCacheService: ResolverCacheService, @inject(ScriptRunnerService) private scriptRunnerService: ScriptRunnerService) { }

    async executeQrCode(qrCode: string): Promise<Result<Object, Failure>> {
        const resolver = await this.findMachingResolver(qrCode);
        if (resolver.isErr()) {
            return err(resolver.error);
        }
        const input = {
            qrCode: qrCode,
            resolver: resolver.value
        }

        const output = {};
        const result = await this.scriptRunnerService.runScript(resolver.value.script, input, output);
        if (result.isErr()) {
            return err(result.error);
        }
        return ok(output);
    }

    async findMachingResolver(qrCode: string): Promise<Result<Resolver, Failure>> {
        const cacheResolver = this.resolverCacheService.getCache().filter(function (cResolver) {
            return cResolver.regex.test(qrCode)
        });
        if (cacheResolver.length == 0) {
            return err(new Failure("No matching resolver found for the provided QR code", 404));
        }
        const resolver = cacheResolver[0];
        return ok(resolver);

    }

}