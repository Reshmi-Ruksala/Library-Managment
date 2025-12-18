import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Save, X, Loader2, BookOpen, ArrowLeft, Edit3 } from 'lucide-react';
import "./EditBook.css";

const CATEGORIES = ["Fiction", "Non-Fiction", "Science", "Technology", "Biography", "History", "Fantasy", "Thriller"];

export default function EditBook() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
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
        setCategory(res.data.category || CATEGORIES[0]); 
      } catch (err) {
        alert("Failed to load book data");
        navigate("/books");
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put(`/books/${id}`, { id: Number(id), title, author, description, category });
      navigate("/books");
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="form-main-content">
        <div className="form-navigation">
          <button onClick={() => navigate("/books")} className="back-link">
            <ArrowLeft size={18} /> Back to Catalog
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <Loader2 className="spinner" size={40} />
            <p>Fetching book data...</p>
          </div>
        ) : (
          <div className="form-layout-grid">
            {/* Left Side: Dynamic Info */}
            <div className="form-info-panel">
              <div className="icon-badge edit-theme">
                <Edit3 size={32} />
              </div>
              <h1>Edit Entry</h1>
              <p>Modifying details for: <br/><strong>{title}</strong></p>
              
              <div className="id-pill">Record ID: #{id}</div>
            </div>

            {/* Right Side: Form Card */}
            <form onSubmit={handleSave} className="entry-card">
              <div className="field-group">
                <label>Book Title <span>*</span></label>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </div>

              <div className="input-row split">
                <div className="field-group">
                  <label>Author <span>*</span></label>
                  <input 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
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
                />
              </div>

              <div className="form-button-cluster">
                <button type="button" onClick={() => navigate("/books")} className="btn-secondary">
                  <X size={18} /> Discard
                </button>
                <button type="submit" disabled={saving} className="btn-primary-action">
                  {saving ? (
                    <><Loader2 size={18} className="spinner" /> Updating...</>
                  ) : (
                    <><Save size={18} /> Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}