import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
let pool: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  // Test database connection
  pool.connect()
    .then((client: any) => {
      console.log('Connected to Neon PostgreSQL database');
      client.release();
    })
    .catch((err: any) => {
      console.error('Error connecting to database:', err);
      console.log('Server will run without database connection');
    });
} else {
  console.log('DATABASE_URL not set. Server will run without database connection.');
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Elliot & Mater Jewelry API is running' });
});

// Database health check
app.get('/api/db-health', async (req, res) => {
  if (!pool) {
    return res.status(500).json({ 
      status: 'error', 
      message: 'Database connection not established',
      database_connected: false 
    });
  }

  try {
    const result = await pool.query('SELECT NOW()');
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    
    res.json({ 
      status: 'ok', 
      message: 'Database connection successful',
      database_connected: true,
      server_time: result.rows[0].now,
      user_count: parseInt(userCount.rows[0].count)
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      database_connected: false,
      error: error.message 
    });
  }
});

// Debug endpoint to test user data
app.get('/api/debug/users', async (req, res) => {
  if (!pool) {
    return res.status(500).json({ error: 'Database not connected' });
  }

  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, role, LEFT(password, 20) as password_preview FROM users LIMIT 5');
    res.json({ users: result.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Import routes
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import userRoutes from './routes/users';
import cartRoutes from './routes/cart';
import wishlistRoutes from './routes/wishlist';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
