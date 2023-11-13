import { AuthController } from '../controllers/AuthController';
import express from 'express';
import { UserService } from '../services/UserService';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const router = express.Router();

//Repo
const userRepository = AppDataSource.getRepository(User);

// Services to Inject
const userService = new UserService(userRepository);

const authController = new AuthController(userService);

router.post('/register', (req, res) => authController.register(req, res));

export default router;
