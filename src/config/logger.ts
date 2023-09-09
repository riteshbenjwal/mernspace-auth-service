import winston from 'winston';
import { CONFIG } from '.';

const { LOG_LEVEL, CURRENT_SERVICE, ENVIRONMENT } = CONFIG;

export const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    defaultMeta: {
        service: CURRENT_SERVICE,
    },
    transports: [
        new winston.transports.File({
            dirname: 'logs',
            filename: 'application.log',
            silent: ENVIRONMENT === 'test',
        }),
        new winston.transports.Console({
            silent: ENVIRONMENT === 'test' || ENVIRONMENT === 'production',
            // format: winston.format.simple(),
        }),
    ],
});
