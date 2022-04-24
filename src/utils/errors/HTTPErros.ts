import { STATUS_CODES } from 'http';

export enum ERRORS_NAMES {
    RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export class HTTPErrors {
    static RESOURCE_NOT_FOUND = {
        name: ERRORS_NAMES.RESOURCE_NOT_FOUND,
        type: STATUS_CODES[404] || '',
        code: 404,
    };

    static VALIDATION_ERROR = {
        name: ERRORS_NAMES.VALIDATION_ERROR,
        type: STATUS_CODES[422] || '',
        code: 422,
    };
}
