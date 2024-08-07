import {BookService} from "../services/BookService.js";

export class BookController {
  constructor() {
    this.bookService = new BookService()
  }

  createBook = async (req, res) => {
    const {titulo, autor, editora, preco, imagem} = req.body;

    try {
      const newBook =
        await this.bookService.createBook({titulo, autor, editora, preco, imagem});
      res.status(201).json(newBook);

      console.log(`Recebido POST`);
      console.log('Dados recebidos:', {titulo, autor, editora, preco, imagem});

    } catch (error) {
      console.error('Erro ao criar livro:', error.message);
      res.status(500).json({error: error.message});
    }
  }

  findAllBooks = async (req, res) => {
    try {

      const books =
        await this.bookService.findAllBooks();

      res.status(200).json(books);
    } catch (error) {
      console.error('Erro ao buscar livros:', error.message);
      res.status(500).json({error: 'Erro ao buscar livros.'});
    }
  }

  findBookById = async (req, res) => {
    const {id} = req.params;
    try {
      const book =
        await this.bookService.findBookById(id);
      if (!book) {
        return res.status(404).json({message: 'Livro não encontrado.'});
      }
      res.status(200).json(book);
    } catch (error) {
      console.error('Erro ao buscar livro:', error.message);
      res.status(500).json({error: 'Erro ao buscar livro.'});
    }
  }

  updateBook = async (req, res) => {
    const {id} = req.params;
    const {titulo, autor, editora, preco, imagem} = req.body;

    try {
      const updatedBook =
        await this.bookService.updateBook({
          id, titulo, autor, editora, preco, imagem
        });

      console.log(`Recebido PUT para ID: ${id}`);
      console.log('Dados recebidos:', {titulo, autor, editora, preco, imagem});
      res.json(updatedBook);

    } catch (error) {
      console.error('Erro ao atualizar livro:', error.message);
      res.status(404).json({error: error.message});
    }
  }

  deleteBook = async (req, res) => {
    const {id} = req.params;
    try {
      await this.bookService.deleteBook(id);
      console.log(`Livro deletado ID: ${id}`);
      res.status(204).json({message: 'Livro deletado'});
    } catch (error) {
      console.error('Erro ao excluir livro:', error.message);
      res.status(500).json({error: 'Erro ao excluir livro.'});
    }
  }
}
