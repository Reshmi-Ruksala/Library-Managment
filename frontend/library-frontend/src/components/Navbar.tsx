// src/components/Navbar.tsx
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <span className="logo-main">Library</span>
          <span className="logo-sub">Management</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/books" className="nav-link">
            Books
          </Link>

          <Link to="/books/add" className="nav-btn add-btn">
            + Add Book
          </Link>

          <button onClick={logout} className="nav-btn logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
