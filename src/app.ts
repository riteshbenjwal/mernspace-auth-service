import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { HttpError } from 'http-errors';
import { logger } from './config/logger';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to auth api server');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(err.statusCode || 500).json({
        name: err.name,
        statusCode: err.statusCode,
        message: err.message,
        details: [],
    });
});

export default app;
