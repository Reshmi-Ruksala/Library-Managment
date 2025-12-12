// src/pages/BookList.tsx
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./BookList.css";

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
};

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get<Book[]>("/books");
      setBooks(res.data);
      setError("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load books");

      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="page">
      <Navbar />

      <main className="container">
        <div className="header">
          <h1>📚 Books</h1>
          <button className="add-btn" onClick={() => navigate("/books/add")}>
            + Add Book
          </button>
        </div>

        {loading && <p className="loading">Loading books...</p>}
        {error && <p className="error">{error}</p>}

        <div className="book-grid">
          {books.length === 0 && !loading ? (
            <div className="empty-box">
              <p>No books yet. Click “Add Book” to create one.</p>
            </div>
          ) : (
            books.map((book) => (
              <div key={book.id} className="book-card">
                <h2>{book.title}</h2>
                <p className="author">by {book.author}</p>
                <p className="description">{book.description}</p>

                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/books/edit/${book.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
