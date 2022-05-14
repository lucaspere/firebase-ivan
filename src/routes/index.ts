import { FastifyInstance } from 'fastify';
import { notesRouter } from './noteRoute';

const AppErrorSchema = {
    $id: 'AppError',
    type: 'object',
    properties: {
        name: { type: 'string', description: 'The type of error' },
        message: {
            type: 'string',
            description: "The error's status code message",
        },
        statusCode: {
            type: 'string',
            description: "The error's status code",
        },
        details: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    field: {
                        type: 'string',
                        description: "The error's status code message",
                    },
                    description: {
                        type: 'string',
                        description: "The error's status code message",
                    },
                    location: {
                        type: 'string',
                        description: "The error's status code message",
                    },
                },
            },
        },
    },
};

export default async (app: FastifyInstance): Promise<void> => {
    app.addSchema(AppErrorSchema);
    await app.register(notesRouter, { prefix: 'notes', logLevel: 'info' });
};
