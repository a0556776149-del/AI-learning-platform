import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="register-container">
      <h1>AI Learning Platform</h1>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}
