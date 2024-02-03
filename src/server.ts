import { logger } from './config/logger';
import app from './app';
import { Config } from './config';
import { AppDataSource } from './config/data-source';
import { User } from './entity/User';
import bcrypt from 'bcryptjs';

const PORT = Config.PORT || 8000;

const startServer = async (port: string | number) => {
    try {
        await AppDataSource.initialize();
        logger.info('Database Connected Successfully');
        app.listen(port, () => {
            logger.info(`Listening on port ${port}`);
        });
        await addAdminUser();
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

const addAdminUser = async () => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const adminUser = await userRepo.findOne({
            where: {
                email: 'admin@gmail.com',
            },
        });

        if (!adminUser) {
            const admin = new User();
            admin.firstName = 'Admin';
            admin.lastName = 'User';
            admin.email = 'admin@gmail.com';
            admin.password = await bcrypt.hash('password', 10);
            admin.role = 'admin';

            await userRepo.save(admin);
            logger.info('Admin user created successfully');
        } else {
            logger.info('Admin user already exists');
        }
    } catch (error) {
        logger.error('Failed to add admin user: ', error);
    }
};
