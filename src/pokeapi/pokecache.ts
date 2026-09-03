export class PokeCache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, {createdAt: Date.now(), val: val});
    }

    get<T>(key: string): T | undefined {
        if (this.#cache.has(key)) {
            const result = this.#cache.get(key);
            if (result) {
                return result.val;
            }
        }
        return undefined;
    }

    #reap() {
        this.#cache.forEach((entry: CacheEntry<any>, key: string) => {
            if (Date.now() - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        });
    }

    #startReapLoop() {
        this.#reapIntervalID = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalID);
        this.#reapIntervalID = undefined;
    }
}

export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};
