# Book Notes Capstone Project

A full-stack web application to track books you've read with notes, ratings, and cover images. Inspired by [Derek Sivers' book notes](https://sive.rs/book).

## 📋 Features

- **CRUD Operations**: Create, Read, Update, and Delete book entries
- **PostgreSQL Database**: Persistent data storage for all your books
- **Book Covers**: Automatic cover images using the Open Library Covers API
- **Sorting Options**: Sort books by recency, rating, or title
- **Rating System**: Rate books on a 1-10 scale with star visualization
- **Detailed Notes**: Add comprehensive notes and takeaways for each book
- **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Templating**: EJS (Embedded JavaScript)
- **API Integration**: Open Library Covers API (using Axios)
- **Styling**: Custom CSS with gradient designs

## 📁 Project Structure

```
book-notes-capstone/
├── public/
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   └── js/                     # Client-side JavaScript (if needed)
├── views/
│   ├── index.ejs               # Main page displaying all books
│   ├── add.ejs                 # Form to add new books
│   ├── edit.ejs                # Form to edit existing books
│   └── book.ejs                # Detailed view of a single book
├── index.js                    # Main server file with Express routes
├── queries.sql                 # Database setup and sample queries
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd book-notes-capstone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   
   Create a new database called `books`:
   ```sql
   CREATE DATABASE books;
   ```

   Connect to the database and run the queries in `queries.sql`:
   ```bash
   psql -U postgres -d books -f queries.sql
   ```

4. **Configure database connection**
   
   Open `index.js` and update the database configuration:
   ```javascript
   const db = new pg.Client({
     user: "postgres",
     host: "localhost",
     database: "books",
     password: "your_password_here", // Update this!
     port: 5432,
   });
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to: `http://localhost:3000`

## 📖 Usage

### Adding a Book
1. Click "Add New Book" button on the home page
2. Fill in the book details:
   - **Title** (required)
   - **Author** (required)
   - **ISBN** (optional, for cover image)
   - **Rating** (1-10)
   - **Date Read**
   - **Notes** (your thoughts and takeaways)
3. Click "Add Book"

### Viewing Books
- The home page displays all books in a grid layout
- Each card shows the cover, title, author, rating, and preview of notes
- Click "View Details" to see the full book information

### Sorting Books
Use the sort buttons at the top of the page:
- **Recency**: Most recently read books first
- **Rating**: Highest rated books first
- **Title**: Alphabetical order

### Editing a Book
1. Click "Edit" on any book card
2. Update the information
3. Click "Update Book"

### Deleting a Book
1. Click "Delete" on any book card
2. Confirm the deletion

## 🎨 API Integration

This project uses the **Open Library Covers API** to fetch book covers:

- API Endpoint: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`
- Documentation: https://openlibrary.org/dev/docs/api/covers

The ISBN is used to automatically fetch and display book covers. If no ISBN is provided or the cover is not found, a placeholder icon is shown.

## 🗄️ Database Schema

**books** table:
- `id`: Serial primary key
- `title`: VARCHAR(255) - Book title (required)
- `author`: VARCHAR(255) - Author name (required)
- `isbn`: VARCHAR(13) - ISBN for cover image (optional)
- `rating`: INTEGER - Rating 1-10 (optional, with constraint)
- `notes`: TEXT - Your notes and thoughts (optional)
- `date_read`: DATE - When you finished the book (default: current date)
- `created_at`: TIMESTAMP - Record creation time

## 🔒 Error Handling

The application includes comprehensive error handling:
- Database connection errors
- Invalid form submissions
- Missing required fields
- API request failures
- 404 errors for non-existent books

Errors are logged to the console and user-friendly messages are displayed.

## 🎯 Future Enhancements

Potential features to add:
- User authentication and multiple user support
- Book search functionality
- Tags/categories for books
- Export notes to PDF or markdown
- Book recommendations based on ratings
- Reading statistics and analytics
- Import books from Goodreads
- Social features (share book notes)

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Derek Sivers' book notes](https://sive.rs/book)
- Book covers provided by [Open Library](https://openlibrary.org/)
- Created as a capstone project for full-stack web development course

## 📧 Support

If you have any questions or issues, please open an issue in the repository.

---

Happy reading and note-taking! 📚✨
