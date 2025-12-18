import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, User, Mail, Lock, Loader2, ShieldCheck, ShieldAlert } from "lucide-react";
import "./Auth.css"; 

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    let score = 0;
    if (password.length > 7) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  }, [password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await axios.post("http://localhost:5080/api/auth/register", { name, email, password });
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon signup-icon">
            <UserPlus size={28} />
          </div>
          <h1 className="auth-logo-text">Libra<span>Hub</span></h1>
          <p>Join our community of readers today.</p>
        </div>

        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User className="field-icon" size={18} />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="field-icon" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
            </div>
          </div>

          <div className="form-group">
            <label>Secure Password</label>
            <div className="input-wrapper">
              <Lock className="field-icon" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            
            {password.length > 0 && (
              <div className="strength-meter">
                <div className="strength-bar-bg">
                  <div className={`strength-fill strength-${strength}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
                </div>
                <span className="strength-label">
                  {strength < 3 ? <ShieldAlert size={12}/> : <ShieldCheck size={12}/>}
                  {strength === 0 && "Very Weak"}
                  {strength === 1 && "Weak"}
                  {strength === 2 && "Fair"}
                  {strength === 3 && "Strong"}
                  {strength === 4 && "Excellent"}
                </span>
              </div>
            )}
          </div>

          <button className="btn-auth-primary btn-signup" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="spinner" size={20} /> : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}