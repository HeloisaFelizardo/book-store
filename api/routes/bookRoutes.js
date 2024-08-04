import { Router } from 'express';
import { BookController } from '../controllers/BookController.js';

const bookRoutes = Router();
const bookController = new BookController();

bookRoutes.get('/', bookController.findAllBooks);
bookRoutes.get('/:id', bookController.findBookById);
bookRoutes.post('/', bookController.createBook);
bookRoutes.put('/:id', bookController.updateBook);
bookRoutes.delete('/:id', bookController.deleteBook);

export { bookRoutes };
