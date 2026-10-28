import db from '../config/db.js';

// Create a new book
const addNewBook = async (req, res) => {
  const { title, author, isbn, price, cover_photo } = req.body;
  const stmt =
    'INSERT INTO books (title, author, isbn, price, cover_photo) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [title, author, isbn, price, cover_photo];
  try {
    const result = await db.query(stmt, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log('Error inserting book |', err.message);
    return res.json(err.message);
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  const stmt = 'SELECT * FROM books;';
  try {
    const result = await db.query(stmt);
    res.status(200).json(result.rows);
  } catch (err) {
    console.log('Error fetching books |', err.message);
    return res.json(err.message);
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  const stmt = 'SELECT * FROM books WHERE id=$1';
  const values = [id];

  try {
    const result = await db.query(stmt, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Book with ID: ${id} not found` });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: `Error fetching book with ID: ${id} |`,
      message: err.message,
    });
  }
};

// Update a book item
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, price, cover_photo } = req.body;
  const stmt =
    'UPDATE books SET title=$1, author=$2, isbn=$3, price=$4, cover_photo=$5 WHERE id=$6 RETURNING *';
  const values = [title, author, isbn, price, cover_photo, id];
  try {
    const result = await db.query(stmt, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Book with ID: ${id} not found` });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log('Error updating book |', err.message);
    return res.json(err.message);
  }
};

// Delete a book item
const deleteBook = async (req, res) => {
  const { id } = req.params;
  const stmt = 'DELETE FROM books WHERE id=$1 RETURNING *';
  const values = [id];
  try {
    const result = await db.query(stmt, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Book with ID: ${id} not found` });
    }
    res.status(200).json({
      message: `Book with ID: ${id} deleted successfully`,
      deletedBook: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      error: `Error deleting book with ID: ${id} |`,
      message: err.message,
    });
  }
};

// Export the controller functions
export { addNewBook, getAllBooks, getBookById, updateBook, deleteBook };
