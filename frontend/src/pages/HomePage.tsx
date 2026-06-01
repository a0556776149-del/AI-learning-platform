import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getSubCategories, sendPrompt } from "../api";
import type { Category, SubCategory } from "../types";
import "./HomePage.css";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("userId"));
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategories(selectedCategory).then(setSubCategories);
      setSelectedSubCategory(null);
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory) return;
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await sendPrompt(userId, selectedCategory, selectedSubCategory, prompt);
      setResponse(result.response);
    } catch {
      setError("Failed to get AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>AI Learning Platform</h1>
        <div className="header-actions">
          <div className="greeting">
            <span className="greeting-hello">Hello:</span>
            <span className="greeting-name">{userName}</span>
          </div>
          <button onClick={() => navigate("/history")} className="nav-btn">My History</button>
          <button onClick={() => navigate("/admin/login")} className="nav-btn">Admin</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="prompt-form">
        <div className="form-group">
          <label>Category</label>
          <select
            value={selectedCategory ?? ""}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Sub Category</label>
          <select
            value={selectedSubCategory ?? ""}
            onChange={(e) => setSelectedSubCategory(Number(e.target.value))}
            required
            disabled={!selectedCategory}
          >
            <option value="">Select a sub category</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Your Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What do you want to learn?"
            required
            rows={4}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Getting response..." : "Send to AI"}
        </button>
      </form>

      {response && (
        <div className="response-box">
          <h3>AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
