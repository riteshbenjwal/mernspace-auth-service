import { logger } from './../config/logger';
import { AuthController } from '../controllers/AuthController';
import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import { UserService } from '../services/UserService';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import registerValidator from '../validators/register-validator';
import loginValidator from '../validators/login-validator';
import { TokenService } from '../services/TokenService';
import { RefreshToken } from '../entity/RefreshToken';
import { CredentialService } from '../services/CredentialService';
import authenticate from '../middlewares/authenticate';
import { AuthRequest } from '../types/index';
import validateRefreshToken from '../middlewares/validateRefreshToken';
import parseRefreshToken from '../middlewares/parseRefreshToken';

const router = express.Router();

//Repo
const userRepository = AppDataSource.getRepository(User);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

// Services to Inject
const userService = new UserService(userRepository);
const tokenService = new TokenService(refreshTokenRepository);
const credentialService = new CredentialService();

const authController = new AuthController(
    userService,
    logger,
    tokenService,
    credentialService,
);

router.post(
    '/register',
    registerValidator,
    (req: Request, res: Response, next: NextFunction) =>
        authController.register(req, res, next) as unknown as RequestHandler,
);

router.post(
    '/login',
    loginValidator,
    (req: Request, res: Response, next: NextFunction) =>
        authController.login(req, res, next) as unknown as RequestHandler,
);

router.get(
    '/self',
    authenticate as RequestHandler,
    (req: Request, res: Response) =>
        authController.self(
            req as AuthRequest,
            res,
        ) as unknown as RequestHandler,
);

router.post(
    '/refresh',
    validateRefreshToken,
    (req: Request, res: Response, next: NextFunction) =>
        authController.refresh(
            req as AuthRequest,
            res,
            next,
        ) as unknown as RequestHandler,
);

router.post(
    '/logout',
    authenticate as RequestHandler,
    parseRefreshToken,
    (req: Request, res: Response, next: NextFunction) =>
        authController.logout(
            req as AuthRequest,
            res,
            next,
        ) as unknown as RequestHandler,
);

export default router;
