import { Router } from 'express';
import { RegisterController } from '../controllers/RegisterController.js';

const registerRoutes = new Router();
const registerController = new RegisterController();

registerRoutes.post('/register', registerController.createUser.bind(registerController));
registerRoutes.post('/login', registerController.createLogin.bind(registerController));

export { registerRoutes };
