import React, { useEffect, useState } from "react";
import API from "../api";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaDownload,
} from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  const styles = {
    section: {
      padding: "80px 20px",
      backgroundColor: "#0a0e17",
      color: "white",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#111625",
      borderRadius: "15px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.05)",
      transition: "transform 0.3s",
      position: "relative",
    },
    image: { width: "100%", height: "200px", objectFit: "cover" },
    content: { padding: "20px" },
    tag: {
      fontSize: "0.75rem",
      color: "#8a2be2",
      textTransform: "uppercase",
      fontWeight: "bold",
      marginBottom: "8px",
      display: "block",
    },
    title: { fontSize: "1.5rem", marginBottom: "10px" },
    desc: {
      color: "#9ca3af",
      fontSize: "0.9rem",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
    techRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "20px",
    },
    techBadge: {
      backgroundColor: "rgba(138, 43, 226, 0.1)",
      color: "#d65db1",
      padding: "5px 10px",
      borderRadius: "15px",
      fontSize: "0.8rem",
    },
    statsRow: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: "1px solid #333",
      paddingTop: "15px",
      marginTop: "15px",
      color: "#6b7280",
      fontSize: "0.85rem",
    },
    links: { display: "flex", gap: "15px", marginTop: "20px" },
    linkBtn: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
  };

  return (
    <section id="projects" style={styles.section}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "60px",
        }}
      >
        My Work
      </h2>

      <div style={styles.grid}>
        {projects.map((project) => (
          <div key={project._id} style={styles.card}>
            <img src={project.image} alt={project.title} style={styles.image} />

            <div style={styles.content}>
              <span style={styles.tag}>{project.category}</span>
              <h3 style={styles.title}>{project.title}</h3>
              <p style={styles.desc}>{project.description}</p>

              <div style={styles.techRow}>
                {project.techStack &&
                  project.techStack.map((tech, index) => (
                    <span key={index} style={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
              </div>

              <div style={styles.statsRow}>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaStar color="gold" /> {project.stats?.rating || 0}
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaDownload /> {project.stats?.downloads || 0}
                </span>
              </div>

              <div style={styles.links}>
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.linkBtn}
                  >
                    <FaGithub /> Code
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.linkBtn}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
