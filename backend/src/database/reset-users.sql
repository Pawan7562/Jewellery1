-- Reset Test Users - Complete Delete and Recreate
-- Run this in Neon SQL Editor to completely reset test users

-- Delete existing test users
DELETE FROM users WHERE email IN ('customer@test.com', 'admin@test.com');

-- Recreate Test Customer User
-- Email: customer@test.com
-- Password: customer123
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('customer@test.com', '$2a$10$DRcHCFCMDPZ3/qHoc.3VPe1T705DP0Sh29.aYbNEUoN9yb87hgPWC', 'Test', 'Customer', 'customer');

-- Recreate Test Admin User
-- Email: admin@test.com
-- Password: admin123
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('admin@test.com', '$2a$10$MmNrVAuNLH90AcC2PAF8C..Ez43EPSvF9doecYkeDP86J4gOwOXIq', 'Admin', 'User', 'admin');

-- Verify users were created
SELECT id, email, first_name, last_name, role, created_at FROM users WHERE email IN ('customer@test.com', 'admin@test.com');
