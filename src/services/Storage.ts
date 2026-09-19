export class Storage {
    static save<T>(key: string, data: T[]): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load<T>(key: string): T[] {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}