// src/components/Navbar.tsx
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, PlusSquare, LogOut, User } from 'lucide-react'; 
import "./Navbar.css";

// This should come from your login state/context in the real app
const USER_NAME = "Librarian Alice"; 

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    // Perform your actual logout logic
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <Link to="/books" className="logo-main-link">
             <BookOpen size={28} className="logo-icon"/>
             <span className="logo-main">Libra</span>
             <span className="logo-sub">Hub</span>
          </Link>
        </div>

        {/* Navigation Links and Profile */}
        <nav className="nav-links">
          {/* Book Catalog Link (Primary Nav Item) */}
          <Link to="/books" className="nav-link">
            Book Catalog
          </Link>

          {/* Add New Book Button (Primary CTA) */}
          <Link to="/books/add" className="nav-btn add-btn">
            <PlusSquare size={18} />
            <span>Add New Book</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="profile-group">
            <div className="profile-display">
                <User size={20} className="profile-icon"/>
                <span className="profile-name">{USER_NAME}</span>
            </div>
            
            {/* Logout Button (Appears on hover/focus) */}
            <button onClick={logout} className="nav-btn logout-btn">
                <LogOut size={18} />
                <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}