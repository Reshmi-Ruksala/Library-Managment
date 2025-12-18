// src/pages/BookList.tsx
import { useEffect, useState, useMemo } from "react";
import api from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // <-- New: Import Footer
import { 
    Search, 
    Plus, 
    Loader2, 
    Edit3, 
    Trash2, 
    Filter, 
    BookOpen, 
    Bookmark     
} from 'lucide-react'; 
import "./BookList.css";

type Book = {
    id: number;
    title: string;
    author: string;
    description: string;
    category: string; 
};

const CATEGORIES = [
    "All Categories", 
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "Biography",
    "History",
    "Fantasy",     
    "Thriller",     
];

const getDummyCategory = (index: number): string => {
    const realCategories = CATEGORIES.slice(1);
    return realCategories[index % realCategories.length];
};


export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState(CATEGORIES[0]);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const res = await api.get<Book[]>("/books"); 
            
            const booksWithCategory = res.data.map((book, index) => ({
                ...book,
                category: getDummyCategory(index)
            }));
            setBooks(booksWithCategory);
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

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  book.author.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = filterCategory === CATEGORIES[0] || book.category === filterCategory;

            return matchesSearch && matchesCategory;
        });
    }, [books, searchTerm, filterCategory]);
    
    const uniqueCategories = useMemo(() => {
        const categoriesSet = new Set(books.map(book => book.category));
        return categoriesSet.size;
    }, [books]);

    return (
        <div className="page">
            <Navbar />

            <main className="container">
                
                {/* --- DASHBOARD HEADER --- */}
                <div className="dashboard-header">
                    <div className="title-group">
                        <h1>📚 Book Catalog</h1>
                        <p className="subtitle">Explore and manage your library collection.</p>
                    </div>
                    
                    <Link to="/books/add" className="add-btn">
                        <Plus size={18} /> 
                        <span>Add New Book</span>
                    </Link>
                </div>
                
                {/* --- METRICS / INFO CARDS --- */}
                <div className="metric-cards">
                    <div className="metric-card total-books">
                        <p className="metric-label">Total Books</p>
                        <div className="metric-value-group">
                            <span className="metric-value">{books.length}</span>
                            <BookOpen size={24} className="metric-icon"/>
                        </div>
                    </div>

                    <div className="metric-card filtered-books">
                        <p className="metric-label">Showing</p>
                        <div className="metric-value-group">
                            <span className="metric-value">{filteredBooks.length}</span>
                            <Filter size={24} className="metric-icon"/>
                        </div>
                    </div>
                    
                    <div className="metric-card categories-count">
                        <p className="metric-label">Categories</p>
                        <div className="metric-value-group">
                            <span className="metric-value">{uniqueCategories}</span> 
                            <Bookmark size={24} className="metric-icon"/>
                        </div>
                    </div>
                </div>


                {/* --- SEARCH AND FILTER CONTROLS (Updated for modern look) --- */}
                <div className="control-panel">
                    {/* Search Bar */}
                    <div className="search-group">
                        {/* Label is now visually hidden (sr-only) */}
                        <label className="control-label sr-only">Search Books</label>
                        <div className="search-input-wrapper">
                            <Search size={20} className="search-icon"/>
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                    
                    {/* Filter Dropdown */}
                    <div className="filter-group">
                        {/* Label is now visually hidden (sr-only) */}
                        <label className="control-label sr-only">Filter by Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="filter-select"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* --- Loading/Error State --- */}
                {loading && (
                    <div className="status-message loading-box">
                        <Loader2 size={24} className="spinner"/>
                        <p>Loading book catalog...</p>
                    </div>
                )}
                {error && <p className="status-message error-box">{error}</p>}

                {/* --- Book Grid --- */}
                <div className="book-grid">
                    {filteredBooks.length === 0 && !loading && !error ? (
                        <div className="empty-box">
                            {searchTerm || filterCategory !== CATEGORIES[0] ? (
                                <>
                                    <p>No books found matching the current filters.</p>
                                    <button className="reset-search-btn" onClick={() => {setSearchTerm(""); setFilterCategory(CATEGORIES[0]);}}>
                                        Reset Filters
                                    </button>
                                </>
                            ) : (
                                <p>No books yet. Click “Add New Book” to start your collection.</p>
                            )}
                        </div>
                    ) : (
                        filteredBooks.map((book) => (
                            <div key={book.id} className="book-card">
                                <div className="category-tag">{book.category}</div> {/* Category Tag */}
                                <div className="card-content">
                                    <h2>{book.title}</h2>
                                    <p className="author">by {book.author}</p>
                                </div>
                                
                                <div className="card-footer">
                                    <p className="description">{book.description}</p>
                                    <div className="actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => navigate(`/books/edit/${book.id}`)}
                                        >
                                            <Edit3 size={16} /> <span>Edit</span>
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(book.id)}
                                        >
                                            <Trash2 size={16} /> <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            
            <Footer /> {/* <-- New: Render the Footer Component */}

        </div>
    );
}