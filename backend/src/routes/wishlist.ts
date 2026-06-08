import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../database/connection';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get wishlist
router.get('/', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      `SELECT w.*, p.name, p.price, p.image_url 
       FROM wishlist w 
       JOIN products p ON w.product_id = p.id 
       WHERE w.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add to wishlist
router.post('/', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    // Check if already in wishlist
    const existing = await pool.query(
      'SELECT * FROM wishlist WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Item already in wishlist' });
    }

    const result = await pool.query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING *',
      [userId, productId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/:productId', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const userId = req.user.userId;
    await pool.query(
      'DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2',
      [userId, req.params.productId]
    );
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
