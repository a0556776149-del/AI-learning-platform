import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getUserPrompts } from "../api";
import type { User, Prompt } from "../types";
import ReactMarkdown from "react-markdown";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken") ?? "";

  useEffect(() => {
    getAllUsers(token)
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectUser = async (user: User) => {
    setSelectedUser(user);
    const userPrompts = await getUserPrompts(user.id, token);
    setPrompts(userPrompts);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-content">
        <div className="users-panel">
          <h2>Users ({users.length})</h2>
          {loading && <p>Loading...</p>}
          <ul className="users-list">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`user-item ${selectedUser?.id === user.id ? "active" : ""}`}
              >
                <strong>{user.name}</strong>
                <span>{user.phone}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="prompts-panel">
          {!selectedUser && <p className="select-message">Select a user to see their prompts</p>}
          {selectedUser && (
            <>
              <h2>{selectedUser.name}'s Prompts ({prompts.length})</h2>
              {prompts.length === 0 && <p>No prompts yet.</p>}
              {prompts.map((prompt) => (
                <div key={prompt.id} className="prompt-card">
                  <div className="prompt-meta">
                    <span className="category-badge">{prompt.category.name}</span>
                    <span className="subcategory-badge">{prompt.subCategory.name}</span>
                    <span className="date">{new Date(prompt.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="prompt-question"><strong>Q:</strong> {prompt.prompt}</div>
                  <div className="prompt-response">
                    <strong>AI:</strong>
                    <ReactMarkdown>{prompt.response}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
