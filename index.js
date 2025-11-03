import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// PostgreSQL database configuration
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 5432,
});

// Connect to the database
db.connect();

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

/**
 * Helper function to fetch book cover URL from Open Library API
 * @param {string} isbn - The ISBN of the book
 * @returns {string} - URL of the book cover image
 */
function getCoverUrl(isbn) {
  if (!isbn) return null;
  // Open Library Covers API - returns cover image by ISBN
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
}

/**
 * GET / - Home route
 * Displays all books from the database
 * Default sorting: by recency (date_read descending)
 */
app.get("/", async (req, res) => {
  try {
    const sort = req.query.sort || "recency"; // Get sort parameter from query string
    let query = "SELECT * FROM books";

    // Apply sorting based on user selection
    switch (sort) {
      case "rating":
        query += " ORDER BY rating DESC, date_read DESC";
        break;
      case "title":
        query += " ORDER BY title ASC";
        break;
      case "recency":
      default:
        query += " ORDER BY date_read DESC";
        break;
    }

    const result = await db.query(query);
    
    // Add cover URLs to each book
    const books = result.rows.map(book => ({
      ...book,
      cover_url: getCoverUrl(book.isbn)
    }));

    res.render("index.ejs", { 
      books: books,
      currentSort: sort 
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Error loading books from database");
  }
});

/**
 * GET /add - Display form to add a new book
 */
app.get("/add", (req, res) => {
  res.render("add.ejs");
});

/**
 * POST /add - Add a new book to the database
 * Creates a new book entry with title, author, ISBN, rating, notes, and date read
 */
app.post("/add", async (req, res) => {
  const { title, author, isbn, rating, notes, date_read } = req.body;

  try {
    // Validate required fields
    if (!title || !author) {
      return res.status(400).send("Title and author are required");
    }

    // Insert new book into database
    await db.query(
      "INSERT INTO books (title, author, isbn, rating, notes, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, isbn || null, rating || null, notes || null, date_read || new Date()]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book to database");
  }
});

/**
 * GET /edit/:id - Display form to edit an existing book
 */
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }

    const book = result.rows[0];
    // Format date for input field (YYYY-MM-DD)
    if (book.date_read) {
      book.date_read = new Date(book.date_read).toISOString().split('T')[0];
    }

    res.render("edit.ejs", { book });
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).send("Error loading book from database");
  }
});

/**
 * POST /edit/:id - Update an existing book in the database
 */
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, isbn, rating, notes, date_read } = req.body;

  try {
    // Validate required fields
    if (!title || !author) {
      return res.status(400).send("Title and author are required");
    }

    // Update book in database
    await db.query(
      "UPDATE books SET title = $1, author = $2, isbn = $3, rating = $4, notes = $5, date_read = $6 WHERE id = $7",
      [title, author, isbn || null, rating || null, notes || null, date_read || new Date(), id]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book in database");
  }
});

/**
 * POST /delete/:id - Delete a book from the database
 */
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book from database");
  }
});

/**
 * GET /book/:id - Display detailed view of a single book
 */
app.get("/book/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }

    const book = result.rows[0];
    book.cover_url = getCoverUrl(book.isbn);

    res.render("book.ejs", { book });
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).send("Error loading book from database");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
