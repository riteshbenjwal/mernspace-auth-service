import { config } from 'dotenv';

config();

const { PORT } = process.env;

export const CONFIG = {
    PORT: PORT || 3000,
};
