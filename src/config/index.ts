import { config } from 'dotenv';

config();

const { PORT, LOG_LEVEL, CURRENT_SERVICE, ENVIRONMENT } = process.env;

export const CONFIG = {
    PORT: PORT || 3000,
    LOG_LEVEL: LOG_LEVEL || 'info',
    CURRENT_SERVICE: CURRENT_SERVICE,
    ENVIRONMENT: ENVIRONMENT,
};
