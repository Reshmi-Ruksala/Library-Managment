// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { BookOpen, Github, Linkedin } from 'lucide-react'; 
import "./Footer.css";

// Year calculation for dynamic copyright date
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        
        {/* Left Section: Logo & Copyright */}
        <div className="footer-left">
          <div className="footer-logo">
             <BookOpen size={24} className="logo-icon"/>
             <span className="logo-main">LibraHub</span>
          </div>
          <p className="copyright">
            © {currentYear} LibraHub. All rights reserved.
          </p>
        </div>
        
        {/* Center Section: Navigation Links */}
        <div className="footer-center">
          <h3>Quick Links</h3>
          <div className="link-group">
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/support" className="footer-link">Support</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </div>
        </div>

        {/* Right Section: Social/Developer Links */}
        <div className="footer-right">
          <h3>Connect</h3>
          <div className="social-icons">
            <a href="#" target="_blank" aria-label="GitHub"><Github size={20} className="social-icon"/></a>
            <a href="#" target="_blank" aria-label="LinkedIn"><Linkedin size={20} className="social-icon"/></a>
          </div>
        </div>

      </div>
      
      {/* Bottom Bar for aesthetic appeal */}
      <div className="footer-bottom-bar"></div>
    </footer>
  );
}