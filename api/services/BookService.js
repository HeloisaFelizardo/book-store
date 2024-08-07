import {prisma} from '../index.js';

export class BookService {
  async createBook({titulo, autor, editora, preco}) {
    if (!titulo || !autor || !editora || !preco) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    if (await this.bookExists(titulo)) {
      throw new Error('O título do livro já existe.');
    }

    return prisma.book.create({
      data: {titulo, autor, editora, preco},
    });
  }

  async bookExists(titulo) {
    return !!await prisma.book.findUnique({where: {titulo}});
  }

  async findAllBooks() {
    return prisma.book.findMany(); // Simplesmente busca todos os livros
  }

  async findBookById(id) {
    if (!id) {
      throw new Error('Livro não encontrado.');
    }
    return prisma.book.findUnique({where: {id}});
  }

  async updateBook({id, titulo, autor, editora, preco}) {
    if (!id) {
      throw new Error('ID do livro é obrigatório.');
    }

    if (!titulo || !autor || !editora || !preco) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    const existingBook =
      await prisma.book.findUnique({where: {id}});
    if (!existingBook) {
      throw new Error('Livro não encontrado.');
    }

    return prisma.book.update({
      where: {id},
      data: {titulo, autor, editora, preco},
    });
  }

  async deleteBook(id) {
    if (!id) {
      throw new Error('ID do livro é obrigatório.');
    }
    return prisma.book.delete({where: {id}})
  }

}
