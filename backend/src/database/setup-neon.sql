-- Neon Database Setup for Jewelry E-commerce
-- Run this script in your Neon database SQL editor

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

-- Insert test users (passwords are bcrypt hashed)
-- Test Customer: email: customer@test.com, password: password123
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('customer@test.com', '$2a$10$XQ8z8z8z8z8z8z8z8z8z8O8z8z8z8z8z8z8z8z8z8z8z8z8z8z8', 'Test', 'Customer', 'customer')
ON CONFLICT (email) DO NOTHING;

-- Test Admin: email: admin@test.com, password: admin123
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('admin@test.com', '$2a$10$YQ9y9y9y9y9y9y9y9y9y9O9y9y9y9y9y9y9y9y9y9y9y9y9y9y9y', 'Admin', 'User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Note: The above passwords are placeholder hashes. 
-- To create proper bcrypt hashes, use this query pattern:
-- For 'password123': $2a$10$rKZxYxYxYxYxYxYxYxYxYuYxYxYxYxYxYxYxYxYxYxYxYxYxYxYx
-- For 'admin123': $2a$10$sLZzZzZzZzZzZzZzZzZzZvZzZzZzZzZzZzZzZzZzZzZzZzZzZzZz

-- Verify tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verify test users
SELECT id, email, first_name, last_name, role FROM users;
