import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminCreateUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "advisor",
    domain: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      await api.post("/users/create", {
        name: form.name,
        email: form.email,
        role: form.role,
        domain: form.domain,
      });

      alert("User created successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3>Create User</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="advisor">Advisor</option>
            <option value="reviewer">Reviewer</option>
          </select>
        </div>

        <div>
          <label>Domain</label>
          <input
            name="domain"
            placeholder="e.g. Full Stack, Backend"
            value={form.domain}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateUser;
