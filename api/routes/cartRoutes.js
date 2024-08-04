import { Router } from 'express';
import { CartController } from '../controllers/CartController.js';

const cartRoutes = Router();
const cartController = new CartController();

cartRoutes.post('/',  cartController.createCart);
cartRoutes.get('/:userId',  cartController.getCart);
cartRoutes.delete('/:cartId',  cartController.deleteCart);

export { cartRoutes };
