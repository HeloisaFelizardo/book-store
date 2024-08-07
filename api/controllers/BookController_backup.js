import { prisma } from '../index.js';

export class BookController {
  async findAllBooks(req, res) {
    try {
      const books = await prisma.book.findMany();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar livros.' });
    }
  }

  async findBookById(req, res) {
    const { id } = req.params;
    try {
      const book = await prisma.book.findUnique({
        where: { id }, // Tratando id como string
      });
      if (!book) {
        return res.status(404).json({ message: 'Livro não encontrado.' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar livro.' });
    }
  }

  async createBook(req, res) {
    try {
      const { titulo, autor, editora, preco } = req.body;
      const newBook = await prisma.book.create({
        data: { titulo, autor, editora, preco },
      });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar livro.' });
    }
  }

  async updateBook(req, res) {
    const { id } = req.params;
    const { titulo, autor, editora, preco } = req.body;

    console.log(`Recebido PUT para ID: ${id}`); // Log do ID
    console.log('Dados recebidos:', { titulo, autor, editora, preco }); // Log dos dados

    try {
      const updatedBook = await prisma.book.update({
        where: { id }, // Tratando id como string
        data: { titulo, autor, editora, preco },
      });
      res.json(updatedBook);
    } catch (error) {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  }

  async deleteBook(req, res) {
    const { id } = req.params;
    try {
      await prisma.book.delete({
        where: { id }, // Tratando id como string
      });
      res.status(204).json({ message: 'Livro deletado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir livro.' });
    }
  }
}
