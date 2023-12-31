import { logger } from './config/logger';
import app from './app';
import { Config } from './config';
import { AppDataSource } from './config/data-source';

const PORT = Config.PORT || 8000;

const startServer = async (port: string | number) => {
    try {
        await AppDataSource.initialize();
        logger.info('Database Connected Successfully');
        app.listen(port, () => {
            logger.info(`Listening on port ${port}`);
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        }
    }
};

startServer(PORT);
