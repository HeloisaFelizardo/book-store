import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { bookRoutes } from './routes/bookRoutes.js'; // Ajuste o caminho conforme necessário

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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
