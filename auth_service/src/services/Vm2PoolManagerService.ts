import { createPool, Pool } from "generic-pool";
import { singleton } from "tsyringe";
import { VM } from "vm2";

@singleton()
export class VM2PoolManager {
    private pool: Pool<VM>;

    constructor() {
        this.pool = createPool<VM>({
            create: async () => new VM({ sandbox: {}, timeout: 5000 }),
            destroy: async (vm: VM) => {

            },
            validate: async (vm: VM) => true,
        }, {
            max: 20, // Maximum number of VMs in the pool
            min: 2,  // Minimum number of VMs in the pool
            idleTimeoutMillis: 30000, // Time before an idle VM is destroyed
            evictionRunIntervalMillis: 10000, // Interval to check for idle VMs
        });
    }

    async acquire(): Promise<VM> {
        return this.pool.acquire();
    }

    async release(vm: VM): Promise<void> {
        return this.pool.release(vm);
    }

    async destroy(vm: VM): Promise<void> {
        return this.pool.destroy(vm);
    }

    async drain(): Promise<void> {
        await this.pool.drain();
        return this.pool.clear();
    }
}