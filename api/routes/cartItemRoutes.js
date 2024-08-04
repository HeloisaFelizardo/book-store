import { Router } from 'express';
import { CartItemController } from '../controllers/CartItemController.js';


const cartItemRoutes = Router();
const cartItemController = new CartItemController();

cartItemRoutes.post('/', cartItemController.createCartItem);
cartItemRoutes.delete('/:id',cartItemController.deleteCartItem);

export { cartItemRoutes };
