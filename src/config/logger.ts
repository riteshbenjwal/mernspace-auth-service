import winston from 'winston';
import { Config } from '.';

const { LOG_LEVEL, CURRENT_SERVICE, NODE_ENV } = Config;

export const logger = winston.createLogger({
    level: LOG_LEVEL,
    defaultMeta: {
        service: CURRENT_SERVICE,
    },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.File({
            dirname: 'logs',
            filename: 'combined.log',
            level: LOG_LEVEL,
            silent: NODE_ENV === 'test',
        }),
        new winston.transports.File({
            dirname: 'logs',
            filename: 'error.log',
            level: 'error',
            silent: NODE_ENV === 'test',
        }),
        new winston.transports.Console({
            level: LOG_LEVEL,
            silent: NODE_ENV === 'test',
        }),
    ],
});
