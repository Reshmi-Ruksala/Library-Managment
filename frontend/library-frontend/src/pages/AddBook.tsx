// src/pages/AddBook.tsx
import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Loader2, Save, X } from 'lucide-react'; // Added icons
import "./AddBook.css"; // <-- Import new CSS file

// Dummy Categories for the dropdown
const CATEGORIES = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "Biography",
    "History",
    "Fantasy",
    "Thriller",
];

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]); // <-- New State for Category
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert("Title and Author are required");
      return;
    }
    try {
      setSubmitting(true);
      // NOTE: Send the category data to the API as well
      await api.post("/books", { 
        title: title.trim(), 
        author: author.trim(), 
        description,
        category // <-- Added category field to payload
      });
      navigate("/books");
    } catch (err) {
      console.error(err);
      alert("Failed to create book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-form"> {/* Use the dedicated page class */}
      <Navbar />
      <main className="form-container">
        
        <h1 className="form-title">➕ Add New Book</h1>

        <form onSubmit={handleCreate} className="form-card">
          
          {/* --- Input: Title --- */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">Title <span className="required-star">*</span></label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="e.g., The Secret Library"
              required
            />
          </div>

          {/* --- Input: Author --- */}
          <div className="form-group">
            <label className="form-label" htmlFor="author">Author <span className="required-star">*</span></label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-input"
              placeholder="e.g., Jane Doe"
              required
            />
          </div>
          
          {/* --- Dropdown: Category --- */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input select-input"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>


          {/* --- Textarea: Description --- */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input textarea-input"
              placeholder="A short summary of the book content."
            />
          </div>

          {/* --- Action Buttons --- */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={submitting}
              className="submit-btn"
            >
              {submitting ? (
                <>
                    <Loader2 size={20} className="spinner" />
                    <span>Creating...</span>
                </>
              ) : (
                <>
                    <Save size={20} />
                    <span>Create Book</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="cancel-btn"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}