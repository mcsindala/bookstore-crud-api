import { Pool } from 'pg';

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookstore-crud-api',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // Max number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 5000, // Return an error if a connection takes too long
});

const testConnection = async () => {
  try {
    // Request a single client connection from the pg pool
    const client = await db.connect();

    // Extract the database name dynamically from the connection parameters
    const database = client.connectionParameters.database;
    console.log(`Connection to '${database}' DB  was successful`);

    // Release the client back to the pool immediately
    client.release();
  } catch (err) {
    console.log('Database connection failed. |', err.message);
  }
};

testConnection();

export default db;
