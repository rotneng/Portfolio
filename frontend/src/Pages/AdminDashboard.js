import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [projForm, setProjForm] = useState({
    title: "",
    description: "",
    category: "Web Apps",
    technologies: "",
    githubLink: "",
    liveLink: "",
    imageType: "url",
    image: "",
    isFeatured: false,
  });
  const [imageFile, setImageFile] = useState(null);

  const [skillForm, setSkillForm] = useState({
    name: "",
    percentage: 50,
    category: "Frontend",
    group: "Core",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const pRes = await axios.get("http://localhost:5000/api/projects");
      const sRes = await axios.get("http://localhost:5000/api/skills");
      setProjects(pRes.data);
      setSkills(sRes.data);
    } catch (err) {
      console.error("Error fetching data");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(projForm).forEach((key) => formData.append(key, projForm[key]));
    if (projForm.imageType === "upload" && imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/api/projects", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Project Added!");
      setProjForm({
        ...projForm,
        title: "",
        description: "",
        technologies: "",
        image: "",
      });
      setImageFile(null);
      fetchData();
    } catch (err) {
      alert("Error adding project");
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/skills", skillForm, {
        headers: { "x-auth-token": token },
      });
      setSkillForm({
        name: "",
        percentage: 50,
        category: "Frontend",
        group: "Core",
      });
      fetchData();
    } catch (err) {
      alert("Error adding skill");
    }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/${type}/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchData();
    } catch (err) {
      alert("Error deleting item");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#0a0e17",
      color: "white",
      padding: "40px 20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      borderBottom: "1px solid #333",
      paddingBottom: "20px",
    },
    tabBtn: (active) => ({
      padding: "10px 20px",
      marginRight: "10px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      backgroundColor: active ? "#8a2be2" : "#1f2937",
      color: "white",
      fontWeight: "bold",
    }),
    form: {
      backgroundColor: "#111625",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "40px",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      backgroundColor: "#0a0e17",
      border: "1px solid #333",
      color: "white",
      borderRadius: "5px",
    },
    row: { display: "flex", gap: "15px" },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "#1f2937",
      padding: "15px",
      borderRadius: "10px",
      position: "relative",
    },
    deleteBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "red",
      color: "white",
      border: "none",
      padding: "8px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            ...styles.tabBtn(false),
            backgroundColor: "#d1d5db",
            color: "black",
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("projects")}
          style={styles.tabBtn(activeTab === "projects")}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          style={styles.tabBtn(activeTab === "skills")}
        >
          Skills
        </button>
      </div>

      {activeTab === "projects" && (
        <>
          <div style={styles.form}>
            <h3>Add Project</h3>
            <form onSubmit={handleProjectSubmit}>
              <input
                style={styles.input}
                placeholder="Title"
                value={projForm.title}
                onChange={(e) =>
                  setProjForm({ ...projForm, title: e.target.value })
                }
                required
              />
              <textarea
                style={styles.input}
                placeholder="Description"
                value={projForm.description}
                onChange={(e) =>
                  setProjForm({ ...projForm, description: e.target.value })
                }
                required
              />

              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="Category"
                  value={projForm.category}
                  onChange={(e) =>
                    setProjForm({ ...projForm, category: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  placeholder="Tech (comma separated)"
                  value={projForm.technologies}
                  onChange={(e) =>
                    setProjForm({ ...projForm, technologies: e.target.value })
                  }
                />
              </div>

              <div style={{ marginBottom: "15px", color: "#ccc" }}>
                <label style={{ marginRight: "15px" }}>
                  <input
                    type="radio"
                    name="imgType"
                    checked={projForm.imageType === "url"}
                    onChange={() =>
                      setProjForm({ ...projForm, imageType: "url" })
                    }
                  />{" "}
                  Image URL
                </label>
                <label>
                  <input
                    type="radio"
                    name="imgType"
                    checked={projForm.imageType === "upload"}
                    onChange={() =>
                      setProjForm({ ...projForm, imageType: "upload" })
                    }
                  />{" "}
                  Upload File
                </label>
              </div>

              {projForm.imageType === "url" ? (
                <input
                  style={styles.input}
                  placeholder="https://..."
                  value={projForm.image}
                  onChange={(e) =>
                    setProjForm({ ...projForm, image: e.target.value })
                  }
                />
              ) : (
                <input
                  type="file"
                  style={{ marginBottom: "15px", color: "white" }}
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              )}

              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="GitHub URL"
                  value={projForm.githubLink}
                  onChange={(e) =>
                    setProjForm({ ...projForm, githubLink: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  placeholder="Live Demo URL"
                  value={projForm.liveLink}
                  onChange={(e) =>
                    setProjForm({ ...projForm, liveLink: e.target.value })
                  }
                />
              </div>

              <label style={{ display: "block", marginBottom: "15px" }}>
                <input
                  type="checkbox"
                  checked={projForm.isFeatured}
                  onChange={(e) =>
                    setProjForm({ ...projForm, isFeatured: e.target.checked })
                  }
                />{" "}
                Feature this project?
              </label>

              <button type="submit" style={styles.tabBtn(true)}>
                Add Project
              </button>
            </form>
          </div>

          <div style={styles.cardGrid}>
            {projects.map((p) => (
              <div key={p._id} style={styles.card}>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteItem("projects", p._id)}
                >
                  <FaTrash />
                </button>
                <img
                  src={p.image}
                  alt="proj"
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <h4 style={{ marginTop: "10px" }}>{p.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "#ccc" }}>
                  {p.category}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "skills" && (
        <>
          <div style={styles.form}>
            <h3>Add Skill</h3>
            <form onSubmit={handleSkillSubmit}>
              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="Skill Name"
                  value={skillForm.name}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, name: e.target.value })
                  }
                  required
                />
                <input
                  style={styles.input}
                  placeholder="Category (Frontend, etc)"
                  value={skillForm.category}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, category: e.target.value })
                  }
                  required
                />
              </div>

              <div style={styles.row}>
                <input
                  type="number"
                  style={styles.input}
                  placeholder="Percentage (0-100)"
                  value={skillForm.percentage}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, percentage: e.target.value })
                  }
                  required
                />
                <select
                  style={styles.input}
                  value={skillForm.group}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, group: e.target.value })
                  }
                >
                  <option value="Core">Core</option>
                  <option value="Specialized">Specialized</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" style={styles.tabBtn(true)}>
                Add Skill
              </button>
            </form>
          </div>

          <div style={styles.cardGrid}>
            {skills.map((s) => (
              <div key={s._id} style={styles.card}>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteItem("skills", s._id)}
                >
                  <FaTrash />
                </button>
                <h4>{s.name}</h4>
                <p style={{ fontSize: "0.8rem", color: "#ccc" }}>
                  {s.category} - {s.percentage}%
                </p>
                <div
                  style={{
                    height: "5px",
                    background: "#333",
                    marginTop: "5px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      width: `${s.percentage}%`,
                      height: "100%",
                      background: "#8a2be2",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
