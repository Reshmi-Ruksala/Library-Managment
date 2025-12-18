// src/pages/EditBook.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import { Save, X, Loader2, BookOpen } from 'lucide-react'; // Import icons
import "./EditBook.css"; // <-- Import NEW CSS

// Categories list for the dropdown
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

export default function EditBook() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  // ADDED: State for Category
  const [category, setCategory] = useState(CATEGORIES[0]); 
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/books/${id}`);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setDescription(res.data.description);
        // Load existing category from API, defaulting if missing
        setCategory(res.data.category || CATEGORIES[0]); 
      } catch (err) {
        console.error(err);
        alert("Failed to load book");
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      // INCLUDED: Category in the PUT request payload
      await api.put(`/books/${id}`, { id: Number(id), title, author, description, category });
      navigate("/books");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="form-page">
      <Navbar />
      <main className="form-container">
        <div className="loading-state">
          <Loader2 size={24} className="spinner" /> 
          Loading book details...
        </div>
      </main>
    </div>
  );

  return (
    <div className="form-page">
      <Navbar />
      <main className="form-container">
        <div className="form-header">
          <h1><BookOpen size={28} /> Edit Book Details</h1>
          <p className="subtitle">Update the metadata for book ID: **{id}**</p>
        </div>

        <form onSubmit={handleSave} className="book-form">
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input 
                id="title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="form-input" 
                required />
          </div>

          <div className="input-group">
            <label htmlFor="author">Author</label>
            <input 
                id="author"
                value={author} 
                onChange={(e) => setAuthor(e.target.value)}
                className="form-input" 
                required />
          </div>
          
          {/* CATEGORY DROPDOWN */}
          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input" 
                required
            >
                {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
          </div>
          {/* END CATEGORY DROPDOWN */}


          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea 
                id="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="form-input textarea" />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving} className="save-btn">
                {saving ? (
                    <>
                        <Loader2 size={18} className="spinner" /> Saving...
                    </>
                ) : (
                    <>
                        <Save size={18} /> Save Changes
                    </>
                )}
            </button>

            <button type="button" onClick={() => navigate("/books")} className="cancel-btn">
                <X size={18} /> Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}