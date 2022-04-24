import { FastifyError } from 'fastify';
import { BaseError } from './BaseError';
import { ERRORS_NAMES, HTTPErrors } from './HTTPErros';

export type Details = {
    field: string;
    description: string;
    location: string | undefined;
};

export type AppError = {
    name: ERRORS_NAMES | string;
    message: string;
    statusCode: number;
    details: Details[];
};

export const buildValidationError = (
    error: FastifyError & { validationContext?: string },
): AppError => ({
    name: HTTPErrors.VALIDATION_ERROR.name,
    message: HTTPErrors.VALIDATION_ERROR.type,
    statusCode: HTTPErrors.VALIDATION_ERROR.code,
    details: error.validation?.map(err => ({
        field: `${err.dataPath}`,
        description: err.message,
        location: error.validationContext,
    })),
});

export const buildNotFoundError = (
    error: BaseError,
    id: string,
    path: string,
): AppError => ({
    ...error,
    message: HTTPErrors.RESOURCE_NOT_FOUND.type,
    details: [
        {
            field: '/id',
            description: error.message,
            location: path,
        },
    ],
});
