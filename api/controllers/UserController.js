import { prisma } from '../index.js';
import bcrypt from 'bcrypt';

export class UserController{
  async createUser(req, res) {
    const {email, password, name, role} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    try {

      const newUser = await prisma.user.create({
        data: { email, password: passwordHash, name, role },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar livro.' });
    }
  }
}