import { prisma } from '../index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';

export class RegisterController {
  async createUser(req, res) {
    const {email, password, name} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: passwordHash,
          name,
          role: 'USER',
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({error: 'User already exists'});
    }
  }


  async createLogin(req, res) {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({where: {email}});

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({userId: user.id, role: user.role}, JWT_SECRET, {expiresIn: '1h'});
      res.json({token});
    } else {
      res.status(401).json({error: 'Invalid email or password'});
    }
  }
}