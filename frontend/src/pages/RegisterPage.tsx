import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../api";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [tab, setTab] = useState<"register" | "login">("register");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await createUser(name, phone);
      localStorage.setItem("userId", String(user.id));
      localStorage.setItem("userName", user.name);
      navigate("/home");
    } catch {
      setError("Registration failed. Phone may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await loginUser(phone);
      localStorage.setItem("userId", String(user.id));
      localStorage.setItem("userName", user.name);
      navigate("/home");
    } catch {
      setError("User not found. Please register first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>AI Learning Platform</h1>

      <div className="tabs">
        <button
          className={`tab-btn ${tab === "register" ? "active" : ""}`}
          onClick={() => { setTab("register"); setError(""); }}
        >
          Register
        </button>
        <button
          className={`tab-btn ${tab === "login" ? "active" : ""}`}
          onClick={() => { setTab("login"); setError(""); }}
        >
          Login
        </button>
      </div>

      {tab === "register" ? (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
}
