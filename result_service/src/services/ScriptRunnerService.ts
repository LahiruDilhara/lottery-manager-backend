import { inject, injectable } from "tsyringe";
import { VM2PoolManager } from "./Vm2PoolManagerService";
import { debug } from "debug";
import { Result, ok, err } from "neverthrow";
import { Failure } from "../core/Failure";

@injectable()
export class ScriptRunnerService {
    constructor(@inject(VM2PoolManager) private vm2PoolManager: VM2PoolManager) { }

    async runScript<I = any, O = any>(script: string, input: I): Promise<Result<O, Failure>> {
        const vm = await this.vm2PoolManager.acquire();

        const sandbox: any = {
            input,
            output: {}
        };

        try {
            vm.setGlobals(sandbox);
            await vm.run(script);
            return ok(sandbox.output as O);
        }
        catch (er) {
            debug("error")("Script error", er);
            return err(new Failure(`Script execution failed. ${er}`, 500));
        }
        finally {
            vm.setGlobals({});
            await this.vm2PoolManager.release(vm);
        }
    }
}