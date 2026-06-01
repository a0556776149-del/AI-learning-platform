import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await adminLogin(password);
      localStorage.setItem("adminToken", token);
      navigate("/admin");
    } catch {
      setError("Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
