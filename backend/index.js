import dotenv from 'dotenv/config';
import db from './config/db.js';
import express from 'express';
import cors from 'cors'
import bookRoutes from './routes/bookRoutes.js';

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Express App running on port 3000');
});

app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
