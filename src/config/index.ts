/* eslint-disable no-console */
import { config } from 'dotenv';
import path from 'path';

config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const {
    PORT,
    LOG_LEVEL,
    CURRENT_SERVICE,
    ENVIRONMENT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    REFRESH_TOKEN_SECRET,
} = process.env;

// eslint-disable-next-line no-console

export const Config = {
    PORT: PORT || 3000,
    LOG_LEVEL: LOG_LEVEL || 'info',
    CURRENT_SERVICE: CURRENT_SERVICE,
    ENVIRONMENT: ENVIRONMENT,
    NODE_ENV: NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    REFRESH_TOKEN_SECRET,
};
