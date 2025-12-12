// src/pages/EditBook.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";

export default function EditBook() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
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
      await api.put(`/books/${id}`, { id: Number(id), title, author, description });
      navigate("/books");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <div className="text-slate-600">Loading book...</div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Edit Book</h1>

        <form onSubmit={handleSave} className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded px-3 py-2" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[120px]" />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700 disabled:opacity-60">
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button type="button" onClick={() => navigate("/books")} className="px-4 py-2 border rounded">
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
