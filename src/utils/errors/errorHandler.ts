import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { BaseError } from './BaseError';
import { buildValidationError, buildNotFoundError } from './errorBuilders';

export const customErrorHandler = (
    err: FastifyError,
    req: FastifyRequest,
    res: FastifyReply,
): void => {
    if (err.validation) {
        const validationError = buildValidationError(err);
        res.status(validationError.statusCode).send(validationError);

        return;
    }
    if (err instanceof BaseError) {
        const { id } = req.params as { id: string };
        const notFoundError = buildNotFoundError(err, id, req.routerPath);

        res.status(notFoundError.statusCode).send(notFoundError);
        return;
    }
};
