import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPromptHistory } from "../api";
import type { Prompt } from "../types";
import ReactMarkdown from "react-markdown";
import "./HistoryPage.css";

export default function HistoryPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("userId"));
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    getPromptHistory(userId)
      .then(setPrompts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>My Learning History</h1>
        <div className="header-actions">
          <span>Hello, {userName}</span>
          <button onClick={() => navigate("/home")} className="nav-btn">Back to Home</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && prompts.length === 0 && (
        <p className="empty-message">No prompts yet. Go ask the AI something!</p>
      )}

      <div className="prompts-list">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="prompt-card">
            <div className="prompt-meta">
              <span className="category-badge">{prompt.category.name}</span>
              <span className="subcategory-badge">{prompt.subCategory.name}</span>
              <span className="date">{new Date(prompt.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="prompt-question">
              <strong>Q:</strong> {prompt.prompt}
            </div>
            <div className="prompt-response">
              <strong>AI:</strong>
              <ReactMarkdown>{prompt.response}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
