import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:5080/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/books");

    } catch (e) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-page-container">
        {/* NEW CARD CONTAINER */}
        <div className="auth-main-card">
            {/* LEFT VISUAL PANEL */}
            <div className="auth-visual-panel">
                <h3 className="auth-visual-header">LibraHub</h3>
                <h1 className="auth-visual-title">Welcome Back</h1>
                <p className="auth-visual-footer">
                    Sign in to continue your journey with knowledge.
                </p>
            </div>

            {/* RIGHT FORM PANEL */}
            <div className="auth-form-panel">
                <div className="auth-box">
                    <h1 className="auth-logo">LibraHub</h1>
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-welcome-text">Secure access to your Library Management System.</p>

                    {error && <p className="auth-error">{error}</p>}

                    <form onSubmit={handleLogin}>
                        
                        <label htmlFor="email">Email Address</label>
                        <input 
                            id="email"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.name@example.com"
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <div className="password-toggle-container">
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your secure password"
                                required
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? '👀' : '🔒'} 
                            </button>
                        </div>

                        <div className="auth-sub-links">
                            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                        </div>
                        
                        <button className="auth-btn" type="submit">Log In</button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}