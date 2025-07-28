import { singleton } from "tsyringe";
import EventBus from "../core/EventBus";
import User from "../model/User";
import debug from "debug";

@singleton()
export default class CacheUserDataSource {
    constructor() {
        this.flushCache();

        // Register event listener for flushing the cache
        EventBus.on("flushCache", this.flushCache.bind(this));
        EventBus.on("deleteUser", this.removeUser.bind(this));
    }

    private cache: Map<number, User> = new Map();

    public flushCache(): void {
        this.cache.clear();
    }

    public getUserById(id: number): User | undefined {
        return this.cache.get(id);
    }

    public getUserByName(name: string): User | undefined {
        return Array.from(this.cache.values()).find(user => user.name === name);
    }

    public addUser(user: User): void {
        this.cache.set(user.id, user);
    }

    public removeUser(id: number): void {
        if (!this.cache.has(id)) {
            return;
        }
        this.cache.delete(id);
    }
}