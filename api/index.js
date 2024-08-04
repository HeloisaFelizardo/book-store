import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { bookRoutes } from './routes/bookRoutes.js';
import {registerRoutes} from "./routes/registerRoutes.js";
import {authenticateToken} from "./middleware/authenticateToken.js";
import {cartRoutes} from "./routes/cartRoutes.js";
import {cartItemRoutes} from "./routes/cartItemRoutes.js"; // Ajuste o caminho conforme necessário
import {RegisterService} from "./services/RegisterService.js";

const app = express();
app.use(express.json());

export const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});
const PORT = 5000;

app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://localhost:3002",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use('/books', bookRoutes);
app.use('/api', registerRoutes);
app.use('/cart', cartRoutes);
app.use('/cart-items', cartItemRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Cria o usuário admin na inicialização do servidor
  const registerService = new RegisterService();
  registerService.createAdminUser();
});
