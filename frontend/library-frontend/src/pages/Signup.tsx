import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; 

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5080/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Account created successfully! Redirecting...");
      setError("");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch {
      setError("Email already exists or registration failed.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-page-container">
        {/* NEW CARD CONTAINER */}
        <div className="auth-main-card">
            {/* LEFT VISUAL PANEL */}
            <div className="auth-visual-panel">
                <h3 className="auth-visual-header">LibraHub</h3>
                <h1 className="auth-visual-title">Join Today</h1>
                <p className="auth-visual-footer">
                    Start managing your library and assets efficiently.
                </p>
            </div>

            {/* RIGHT FORM PANEL */}
            <div className="auth-form-panel">
                <div className="auth-box">
                    <h1 className="auth-logo">LibraHub</h1>
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-welcome-text">Start managing your library today.</p>

                    {error && <p className="auth-error">{error}</p>}
                    {success && <p className="auth-success">{success}</p>}

                    <form onSubmit={handleSignup}>
                        
                        <label htmlFor="name">Full Name</label>
                        <input 
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Your full name"
                            required
                        />

                        <label htmlFor="email">Email Address</label>
                        <input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Professional email address"
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Minimum 6 characters"
                            required
                        />

                        <button className="auth-btn" type="submit">Sign Up</button>
                    </form>

                    <p className="auth-footer">
                        Already have an account? <Link to="/">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}