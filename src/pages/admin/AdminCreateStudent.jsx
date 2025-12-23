import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminCreateStudent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    advisorId: "",
    batch: "",
    course: "",
  });

  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch advisors on mount
  useEffect(() => {
    const loadAdvisors = async () => {
      try {
        const res = await api.get("/users?role=advisor");
        setAdvisors(res.data);
      } catch (err) {
        setError("Failed to load advisors");
      }
    };

    loadAdvisors();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.advisorId) {
      return setError("Advisor is required");
    }

    try {
      setLoading(true);

      await api.post("/users/create", {
        name: form.name,
        email: form.email,
        role: "student",
        advisorId: form.advisorId,
        batch: form.batch,
        course: form.course,
      });

      alert("Student created successfully");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "0 auto" }}>
      <h3>Create Student</h3>

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
          <label>Advisor</label>
          <select
            name="advisorId"
            value={form.advisorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Advisor --</option>
            {advisors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} ({a.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Batch</label>
          <input
            name="batch"
            value={form.batch}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Course</label>
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateStudent;
