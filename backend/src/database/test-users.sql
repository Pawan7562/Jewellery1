-- Test Users for Jewelry E-commerce
-- Run this in Neon SQL Editor after running setup-neon.sql

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

-- Verify users were created
SELECT id, email, first_name, last_name, role, created_at FROM users WHERE email IN ('customer@test.com', 'admin@test.com');
