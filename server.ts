import { logger } from './src/config/logger';
import app from './src/app';
import { CONFIG } from './src/config';

const PORT = CONFIG.PORT || 8000;

const startServer = async (port: string | number) => {
    try {
        app.listen(port, () => {
            logger.info(`Listening on port ${port}`);
        });
    } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'message' in err) {
            logger.error(`Something went wrong: `, err.message);
        }
    }
};

startServer(PORT);
