import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, Save, X, ArrowLeft, BookPlus } from 'lucide-react';
import "./AddBook.css";

const CATEGORIES = ["Fiction", "Non-Fiction", "Science", "Technology", "Biography", "History", "Fantasy", "Thriller"];

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    
    try {
      setSubmitting(true);
      await api.post("/books", { 
        title: title.trim(), 
        author: author.trim(), 
        description,
        category 
      });
      navigate("/books");
    } catch (err) {
      alert("Failed to create book entry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="form-main-content">
        {/* Navigation Breadcrumb */}
        <div className="form-navigation">
          <button onClick={() => navigate("/books")} className="back-link">
            <ArrowLeft size={18} /> Back to Catalog
          </button>
        </div>

        <div className="form-layout-grid">
          {/* Left Side: Info */}
          <div className="form-info-panel">
            <div className="icon-badge">
              <BookPlus size={32} />
            </div>
            <h1>Add New Book</h1>
            <p>Fill in the details to expand your digital library collection.</p>
            <div className="form-tips">
              <div className="tip-item">✓ Title and Author are required</div>
              <div className="tip-item">✓ Choose a relevant category</div>
            </div>
          </div>

          {/* Right Side: Actual Form */}
          <form onSubmit={handleCreate} className="entry-card">
            <div className="input-row">
              <div className="field-group">
                <label>Book Title <span>*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The Midnight Library"
                  required
                />
              </div>
            </div>

            <div className="input-row split">
              <div className="field-group">
                <label>Author <span>*</span></label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Matt Haig"
                  required
                />
              </div>
              <div className="field-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a brief overview of the book's plot or theme..."
              />
            </div>

            <div className="form-button-cluster">
              <button type="button" onClick={() => navigate("/books")} className="btn-secondary">
                <X size={18} /> Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-primary-action">
                {submitting ? (
                  <><Loader2 size={18} className="spinner" /> Saving...</>
                ) : (
                  <><Save size={18} /> Save Entry</>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}