import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5080/api/auth/login", {

        email,
        password,
      });

      const token = response.data.token;

      // Save token
      localStorage.setItem("token", token);

      // Redirect
      navigate("/books");

    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            background: "black",
            color: "white",
          }}
        >
          Login
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <a href="/signup" style={{ color: "blue" }}>
          Signup
        </a>
      </p>
    </div>
  );
}
