-- Database setup for Book Notes Capstone Project
-- This file contains SQL queries to create and initialize the database

-- Create the database (run this in PostgreSQL)
-- CREATE DATABASE books;

-- Connect to the books database and run the following:

-- Create the books table
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  notes TEXT,
  date_read DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for testing (optional)
INSERT INTO books (title, author, isbn, rating, notes, date_read) VALUES
('The Almanack of Naval Ravikant', 'Eric Jorgenson', '9781544514222', 9, 'Incredible insights on wealth and happiness. Key takeaway: seek wealth, not money or status.', '2024-01-15'),
('Atomic Habits', 'James Clear', '9780735211292', 10, 'Best book on habits. The 4 laws of behavior change are game-changing.', '2024-02-20'),
('Deep Work', 'Cal Newport', '9781455586691', 8, 'Important concepts about focused work in a distracted world.', '2024-03-10'),
('The Psychology of Money', 'Morgan Housel', '9780857197689', 9, 'Great stories about how people think about money. Wealth is what you don''t see.', '2024-04-05'),
('Thinking, Fast and Slow', 'Daniel Kahneman', '9780374533557', 8, 'Dense but valuable. System 1 vs System 2 thinking framework is very useful.', '2024-05-12');

-- Useful queries for the application:

-- Get all books sorted by rating (highest first)
-- SELECT * FROM books ORDER BY rating DESC, date_read DESC;

-- Get all books sorted by date read (most recent first)
-- SELECT * FROM books ORDER BY date_read DESC;

-- Get all books sorted by title (alphabetically)
-- SELECT * FROM books ORDER BY title ASC;

-- Get a specific book by ID
-- SELECT * FROM books WHERE id = 1;

-- Update a book's notes and rating
-- UPDATE books SET notes = 'Updated notes here', rating = 9 WHERE id = 1;

-- Delete a book
-- DELETE FROM books WHERE id = 1;

-- Count total books
-- SELECT COUNT(*) FROM books;

-- Get average rating
-- SELECT AVG(rating) FROM books WHERE rating IS NOT NULL;
