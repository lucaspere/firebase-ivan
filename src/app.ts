import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import api from './routes/index';
import { Server } from './server';
import { SwaggerConfig } from './swaggerConfig';
import { customErrorHandler } from './utils/errors/errorHandler';

export const app = (
    opts: FastifyServerOptions = {
        logger: {
            prettyPrint: true,
            level: 'info',
        },
        ajv: {
            customOptions: {
                allErrors: true,
                strictNumbers: true,
                jsonPointers: true,
            },
        },
    },
): FastifyInstance => {
    const app = Fastify(opts);

    app.register(fastifySwagger, SwaggerConfig);
    app.register(fastifyCors);
    app.register(api, { prefix: 'api' });
    app.setErrorHandler(customErrorHandler);

    return app;
};

const server = app();
new Server(server).run().catch(err => {
    server.log.error(err);
    process.exit(1);
});
