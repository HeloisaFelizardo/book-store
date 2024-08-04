import { prisma } from '../index.js';

export class CartController {
  async createCart(req, res) {
    const { userId } = req.body;
    try {
      const cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error: 'Error creating cart' });
    }
  }

  async getCart(req, res) {
    const { userId } = req.params;
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: 'Cart not found' });
    }
  }

  async deleteCart(req, res) {
    const { cartId } = req.params;
    try {
      await prisma.cart.delete({
        where: { id: cartId },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Error deleting cart' });
    }
  }
}
