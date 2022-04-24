import { ERRORS_NAMES } from './HTTPErros';

export class BaseError extends Error {
    statusCode: number;

    constructor(name: ERRORS_NAMES, statusCode: number, description: string) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
