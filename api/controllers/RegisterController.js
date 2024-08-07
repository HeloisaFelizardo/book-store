import { RegisterService } from '../services/RegisterService.js';

export class RegisterController {
  constructor() {
    this.registerService = new RegisterService();
  }

  async createUser(req, res) {
    const { email, password, name } = req.body;

    try {
      const user =
        await this.registerService.createUser(email, password, name);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async createLogin(req, res) {
    const { email, password } = req.body;

    try {
      const { token } = await this.registerService.createLogin(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async createAdminUser(req, res) {
    try {
      await this.registerService.createAdminUser();
      res.status(200).json({ message: 'Admin user creation process initiated.' });
    } catch (error) {
      console.error('Error creating admin user:', error);
      res.status(500).json({ error: 'Failed to create admin user' });
    }
  }
}
