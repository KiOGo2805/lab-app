import { IUser } from './interfaces/IUser';

export class User implements IUser {
    constructor(
        public id: string, // Згідно з п.13, сюди пропускатимемо лише цифри при валідації
        public name: string,
        public email: string,
        public borrowedBooks: string[] = [] // Масив ID позичених книг (максимум 3 згідно з п.14)
    ) {}
}