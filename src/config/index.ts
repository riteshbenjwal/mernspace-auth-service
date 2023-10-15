import { config } from 'dotenv';

config();

const { PORT, LOG_LEVEL, CURRENT_SERVICE, ENVIRONMENT, NODE_ENV } = process.env;

export const Config = {
    PORT: PORT || 3000,
    LOG_LEVEL: LOG_LEVEL || 'info',
    CURRENT_SERVICE: CURRENT_SERVICE,
    ENVIRONMENT: ENVIRONMENT,
    NODE_ENV: NODE_ENV,
};
