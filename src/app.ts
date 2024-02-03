import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { HttpError } from 'http-errors';
import { logger } from './config/logger';

import authRouter from './routes/auth';
import tenantRouter from './routes/tenant';
import userRouter from './routes/user';

import cookieParser from 'cookie-parser';

const app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true,
    }),
);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to auth api server');
});

app.use('/auth', authRouter);
app.use('/tenants', tenantRouter);
app.use('/users', userRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err?.message);
    const statusCode = err?.statusCode || err?.status || 500;
    res.status(statusCode || 500).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: '',
                location: '',
            },
        ],
    });
});

export default app;
