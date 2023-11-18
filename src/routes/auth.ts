import { logger } from './../config/logger';
import { AuthController } from '../controllers/AuthController';
import express, { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import registerValidator from '../validators/register-validator';

const router = express.Router();

//Repo
const userRepository = AppDataSource.getRepository(User);

// Services to Inject
const userService = new UserService(userRepository);

const authController = new AuthController(userService, logger);

router.post(
    '/register',
    registerValidator,
    (req: Request, res: Response, next: NextFunction) =>
        authController.register(req, res, next),
);

export default router;
