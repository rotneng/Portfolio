import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const techArray = formData.technologies
      .split(",")
      .map((tech) => tech.trim());

    const payload = {
      ...formData,
      technologies: techArray,
    };

    try {

      await API.post("/projects", payload);

      setStatus("success");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };



  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#0a0e17",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "sans-serif",
    },
    container: {
      width: "100%",
      maxWidth: "600px",
      backgroundColor: "#111625",
      padding: "40px",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    },
    title: {
      color: "white",
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "24px",
      textAlign: "center",
    },
    label: {
      color: "#9ca3af",
      display: "block",
      marginBottom: "8px",
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "14px",
      marginBottom: "20px",
      backgroundColor: "#0a0e17",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "white",
      outline: "none",
      fontSize: "1rem",
    },
    textarea: {
      width: "100%",
      padding: "14px",
      marginBottom: "20px",
      backgroundColor: "#0a0e17",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "white",
      outline: "none",
      fontSize: "1rem",
      minHeight: "100px",
      resize: "vertical",
    },
    button: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(to right, #8a2be2, #d65db1)",
      border: "none",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      opacity: status === "submitting" ? 0.7 : 1,
    },
    status: {
      marginTop: "20px",
      textAlign: "center",
      color: status === "success" ? "#48bb78" : "#f56565",
      fontWeight: "bold",
    },
    backLink: {
      display: "block",
      textAlign: "center",
      marginTop: "20px",
      color: "#9ca3af",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Add New Project</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={styles.label}>Project Title</label>
            <input
              style={styles.input}
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={styles.label}>Image URL (e.g. from Unsplash)</label>
            <input
              style={styles.input}
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={styles.label}>Technologies (comma separated)</label>
            <input
              style={styles.input}
              name="technologies"
              placeholder="React, Node.js, MongoDB"
              value={formData.technologies}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>GitHub Link</label>
              <input
                style={styles.input}
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Live Demo Link</label>
              <input
                style={styles.input}
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Uploading..." : "Add Project"}
          </button>

          {status === "success" && (
            <p style={styles.status}>Project Added! Redirecting...</p>
          )}
          {status === "error" && (
            <p style={styles.status}>Error adding project.</p>
          )}

          <span onClick={() => navigate("/")} style={styles.backLink}>
            Cancel and Go Home
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
