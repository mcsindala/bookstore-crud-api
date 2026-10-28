import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const Add = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    cover_photo: '',
  });

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/books/add', book);
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Book
        </h1>
        <form className="flex flex-col gap-4">
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="author"
            label="Author"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="isbn"
            label="ISBN"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            type="number"
            name="price"
            label="Price"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            name="cover_photo"
            label="Cover Photo URL"
            variant="outlined"
            size="small"
            fullWidth
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
              startIcon={<AddIcon />}
              onClick={handleClick}
            >
              Add Book
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
