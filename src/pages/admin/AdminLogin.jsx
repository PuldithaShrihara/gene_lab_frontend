import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid admin username or password");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", data.username || formData.username);

      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-login-badge">Admin Access</span>
          <h1>Admin Login</h1>
          <p>Login to manage website data, users, appointments, test requests, and payments.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter admin username"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </section>
    </main>
  );
}
