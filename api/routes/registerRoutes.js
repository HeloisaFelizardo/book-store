import { Router } from 'express';
import { RegisterController } from '../controllers/RegisterController.js';

const registerRoutes = Router();
const registerController = new RegisterController();

registerRoutes.post('/register', registerController.createUser);
registerRoutes.post('/login', registerController.createLogin);

export { registerRoutes };
