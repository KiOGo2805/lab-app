export namespace Validation {
    export function isRequired(value: string): boolean {
        return value.trim().length > 0;
    }

    export function isValidYear(year: string): boolean {
        const yearRegex = /^(1[0-9]{3}|20[0-9]{2})$/;
        return yearRegex.test(year);
    }

    export function isValidUserId(id: string): boolean {
        const idRegex = /^\d+$/;
        return idRegex.test(id);
    }
}