import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    cover_photo: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/books/update/${id}`, book);
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Book Details
        </h1>
        <form className="flex flex-col gap-4">
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            value={book.title || ''}
            onChange={handleChange}
          />
          <TextField
            name="author"
            label="Author"
            variant="outlined"
            size="small"
            fullWidth
            value={book.author || ''}
            onChange={handleChange}
          />
          <TextField
            name="isbn"
            label="ISBN"
            variant="outlined"
            size="small"
            fullWidth
            value={book.isbn || ''}
            onChange={handleChange}
          />
          <TextField
            type="number"
            name="price"
            label="Price"
            variant="outlined"
            size="small"
            fullWidth
            value={book.price || ''}
            onChange={handleChange}
          />
          <TextField
            name="cover_photo"
            label="Cover Photo URL"
            variant="outlined"
            size="small"
            fullWidth
            value={book.cover_photo || ''}
            onChange={handleChange}
          />
          <div className="flex gap-3 mt-4">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
