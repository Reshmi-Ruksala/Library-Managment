// src/pages/AddBook.tsx
import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
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
      await api.post("/books", { title: title.trim(), author: author.trim(), description });
      navigate("/books");
    } catch (err) {
      console.error(err);
      alert("Failed to create book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Add New Book</h1>

        <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Book title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Author name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[120px]"
              placeholder="Short description"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700 disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Create Book"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
