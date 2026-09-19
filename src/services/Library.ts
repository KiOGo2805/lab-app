import { Storage } from './Storage';

interface IIdentifiable {
    id: string;
}

export class Library<T extends IIdentifiable> {
    private items: T[] = [];
    private storageKey: string;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
        this.load();
    }

    add(item: T): void {
        this.items.push(item);
        this.save();
    }

    remove(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    }

    findById(id: string): T | undefined {
        return this.items.find(item => item.id === id);
    }
    
    find(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }

    getAll(): T[] {
        return this.items;
    }

    update(updatedItem: T): void {
        const index = this.items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            this.items[index] = updatedItem;
            this.save();
        }
    }

    private save(): void {
        Storage.save(this.storageKey, this.items);
    }

    private load(): void {
        this.items = Storage.load<T>(this.storageKey);
    }
}