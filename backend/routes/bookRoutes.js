import { Router } from 'express';
import {
  addNewBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../controllers/bookController.js';

const router = Router();

// Base url is /api/books
router.get('/', getAllBooks); // '/api/books/'
router.post('/add', addNewBook); // '/api/books/add'
router.put('/update/:id', updateBook); // '/api/books/update/:id'
router.get('/:id', getBookById); // '/api/books/id'
router.delete('/:id', deleteBook); // '/api/books/:id'

export default router;
