import { prisma } from '../index.js';

export class CartItemController {
  async createCartItem(req, res) {
    const { cartId, bookId, quantity } = req.body;
    try {
      const cartItem = await prisma.cartItem.create({
        data: {
          cartId,
          bookId,
          quantity,
        },
      });
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ error: 'Error creating cart item' });
    }
  }

  async deleteCartItem(req, res) {
    const { id } = req.params;
    try {
      await prisma.cartItem.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Error deleting cart item' });
    }
  }
}
