import { prisma } from '../index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export class RegisterService {
  async createUser(email, password, name) {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        role: 'USER',
      },
    });

    return user;
  }

  async createLogin(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return { token };
  }

  async createAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('Admin email and password must be set in the environment variables.');
    }

    const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!adminExists) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);

      await prisma.user.create({
        data: {
          email: adminEmail,
          password: passwordHash,
          name: 'Admin',
          role: 'ADMIN',
        },
      });

      console.log('Usuário admin criado com sucesso.');
    } else {
      console.log('Usuário admin já existe.');
    }
  }
}
