import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import "./Auth.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5080/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setTimeout(() => navigate("/books"), 400);
    } catch (e: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon">
            <LogIn size={28} />
          </div>
          <h1 className="auth-logo-text">Libra<span>Hub</span></h1>
          <p>Welcome back! Please sign in to your account.</p>
        </div>

        {error && <div className="auth-alert error">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="field-icon" size={18} />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@company.com"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="field-icon" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              <button 
                type="button" 
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="btn-auth-primary" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="spinner" size={20} /> : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          New to the hub? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}