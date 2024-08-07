import { prisma } from '../index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export class RegisterService {
  async createUser(email, password, name) {
    if (await this.userExists(email)) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.hashPassword(password);
    return prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        role: 'USER',
      },
    });
  }

  async createLogin(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    return {
      token: this.generateToken(user.id, user.role),
    };
  }

  async createAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('Admin email and password must be set in the environment variables.');
    }

    if (await this.userExists(adminEmail)) {
      console.log('Admin user already exists.');
      return;
    }

    const passwordHash = await this.hashPassword(adminPassword);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: passwordHash,
        name: 'Admin',
        role: 'ADMIN',
      },
    });

    console.log('Admin user created successfully.');
  }

  // Métodos auxiliares
  async userExists(email) {
    return !!await prisma.user.findUnique({ where: { email } });
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId, role) {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
  }
}
