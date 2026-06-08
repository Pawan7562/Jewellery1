# Neon Database Setup Guide

## Step 1: Access Neon Database SQL Editor

1. Go to [Neon Console](https://console.neon.tech/)
2. Select your project (neondb)
3. Click on "SQL Editor" in the left sidebar
4. You'll see a query editor where you can run SQL commands

## Step 2: Run Complete Database Setup

Copy and paste the following SQL query into the Neon SQL Editor and click "Run":

```sql
-- Complete Database Setup for Jewelry E-commerce

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  stock_quantity INTEGER DEFAULT 0,
  image_url TEXT,
  materials TEXT,
  dimensions TEXT,
  care_instructions TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id);
```

## Step 3: Insert Sample Data

Run this SQL query to add categories and products:

```sql
-- Insert default categories
INSERT INTO categories (name, description) VALUES
('Rings', 'Beautiful rings for every occasion'),
('Necklaces', 'Elegant necklaces and pendants'),
('Earrings', 'Stunning earrings for style'),
('Bracelets', 'Charming bracelets and cuffs')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category_id, stock_quantity, materials, dimensions, care_instructions) VALUES
('Aurora Diamond Solitaire Ring', 'A stunning solitaire ring featuring a brilliant-cut diamond set in 18k white gold. The Aurora collection embodies timeless elegance.', 3450.00, 1, 10, '18k White Gold, Diamond', 'Band width: 2mm', 'Clean with soft cloth, avoid harsh chemicals'),
('Celeste Rose Gold Hoop Earrings', 'Elegant hoop earrings crafted from rose gold with a modern design perfect for everyday wear.', 690.00, 3, 15, '18k Rose Gold', 'Diameter: 25mm', 'Clean with soft cloth'),
('Meridian Platinum Cuff Bracelet', 'A sophisticated platinum cuff bracelet with clean lines and exceptional craftsmanship.', 1250.00, 4, 8, 'Platinum', 'Width: 8mm', 'Professional cleaning recommended'),
('Luna Sapphire Pendant Necklace', 'A beautiful sapphire pendant necklace on a delicate chain, perfect for special occasions.', 825.00, 2, 12, '18k White Gold, Sapphire', 'Chain length: 18 inches', 'Clean with soft cloth'),
('Horizon Emerald Tennis Bracelet', 'A stunning tennis bracelet featuring emeralds set in white gold.', 2150.00, 4, 5, '18k White Gold, Emerald', 'Length: 7 inches', 'Professional cleaning recommended')
ON CONFLICT DO NOTHING;
```

## Step 4: Create Test Users

Run this SQL query to create test users for login testing:

```sql
-- Test Customer User
-- Email: customer@test.com
-- Password: customer123
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('customer@test.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Test', 'Customer', 'customer')
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role;

-- Test Admin User
-- Email: admin@test.com
-- Password: admin123
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('admin@test.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Admin', 'User', 'admin')
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role;
```

## Step 5: Verify Setup

Run this query to verify all tables were created:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected output:
- cart
- categories
- order_items
- orders
- product_images
- products
- users
- wishlist

Run this query to verify test users:

```sql
SELECT id, email, first_name, last_name, role FROM users;
```

Expected output:
- customer@test.com (Test Customer, role: customer)
- admin@test.com (Admin User, role: admin)

## Step 6: Test Login Process

Once the database is set up, you can test the login process:

1. Start your backend server: `cd backend && npm run dev`
2. Start your frontend server: `cd frontend && npm run dev`
3. Go to the frontend Login page
4. Use test credentials:
   - Customer: `customer@test.com` / `customer123`
   - Admin: `admin@test.com` / `admin123`

## Connection String

Your Neon database connection string is:
```
postgresql://neondb_owner:npg_RxTqa0kmg7PC@ep-dark-moon-aqjqr6a9-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

Make sure this is set in your backend `.env` file as:
```
DATABASE_URL=postgresql://neondb_owner:npg_RxTqa0kmg7PC@ep-dark-moon-aqjqr6a9-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Troubleshooting

If you encounter any issues:

1. **Connection errors**: Verify the DATABASE_URL in your backend .env file matches exactly
2. **Table not found**: Ensure you ran all the SQL queries in order
3. **Login fails**: Verify the test users were created by running the verification query
4. **Permission errors**: Ensure your Neon database user has proper permissions
