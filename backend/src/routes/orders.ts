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

// Create order
router.post('/', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const userId = req.user.userId;
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;

    // Calculate total
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shippingCost = 0; // Free shipping
    const total = subtotal + shippingCost;

    // Generate order number
    const orderNumber = 'ORD-' + Date.now().toString().slice(-6);

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, order_number, status, subtotal, shipping_cost, total, shipping_address, billing_address, payment_method) 
       VALUES ($1, $2, 'pending', $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [userId, orderNumber, subtotal, shippingCost, total, JSON.stringify(shippingAddress), JSON.stringify(billingAddress), paymentMethod]
    );

    const order = orderResult.rows[0];

    // Add order items
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4)',
        [order.id, item.productId, item.quantity, item.price]
      );
    }

    // Clear cart
    await pool.query('DELETE FROM cart WHERE user_id = $1', [userId]);

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user orders
router.get('/', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      `SELECT o.*, 
        (SELECT json_agg(json_build_object('productId', oi.product_id, 'quantity', oi.quantity, 'price', oi.price_at_time)) 
         FROM order_items oi WHERE oi.order_id = o.id) as items
       FROM orders o 
       WHERE o.user_id = $1 
       ORDER BY o.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single order
router.get('/:id', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      `SELECT o.*, 
        (SELECT json_agg(json_build_object('productId', oi.product_id, 'quantity', oi.quantity, 'price', oi.price_at_time)) 
         FROM order_items oi WHERE oi.order_id = o.id) as items
       FROM orders o 
       WHERE o.id = $1 AND o.user_id = $2`,
      [req.params.id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
