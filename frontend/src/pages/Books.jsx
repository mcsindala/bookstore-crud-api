import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AlertBox from '../components/AlertBox';
import defaultCover from '../assets/images/default-cover.jpg';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleOpenDeleteDialog = (id) => {
    setSelectedBookId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBookId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBookId) return;

    try {
      await axios.delete(`http://localhost:3000/api/books/${selectedBookId}`);
      setBooks((prev) => prev.filter((book) => book.id !== selectedBookId));
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/books');
        setBooks(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Book Collection</h1>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add"
          startIcon={<AddIcon />}
        >
          Add New Book
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <div>
              {book.cover_photo ? (
                <img
                  src={book.cover_photo}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  <img
                    src={defaultCover}
                    alt="Default Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
                <div className="flex justify-between items-center text-sm font-semibold text-gray-700 mt-4">
                  <span>ISBN: {book.isbn}</span>
                  <span className="text-green-600 text-base">
                    ${book.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <Button
                variant="contained"
                color="success"
                fullWidth
                component={Link}
                to={`/update/${book.id}`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => handleOpenDeleteDialog(book.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertBox
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Books;
