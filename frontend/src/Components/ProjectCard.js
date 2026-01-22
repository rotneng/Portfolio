import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const defaultImage =
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

  const styles = {
    card: {
      backgroundColor: "#111625",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      transform: isHovered ? "translateY(-10px)" : "translateY(0)",
      boxShadow: isHovered
        ? "0 10px 30px -10px rgba(138, 43, 226, 0.3)"
        : "none",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    imageContainer: {
      height: "200px",
      overflow: "hidden",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
    },
    content: {
      padding: "24px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
      marginBottom: "12px",
    },
    description: {
      color: "#9ca3af",
      fontSize: "0.95rem",
      lineHeight: "1.6",
      marginBottom: "20px",
      flex: 1,
    },
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "24px",
    },
    tag: {
      backgroundColor: "rgba(138, 43, 226, 0.1)",
      color: "#d65db1",
      padding: "4px 12px",
      borderRadius: "99px",
      fontSize: "0.75rem",
      fontWeight: "600",
    },
    linksContainer: {
      display: "flex",
      gap: "16px",
      marginTop: "auto",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#d1d5db",
      textDecoration: "none",
      fontSize: "0.9rem",
      transition: "color 0.2s",
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img
          src={project.image || defaultImage}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
          alt={project.title}
          style={styles.image}
        />
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.description}>{project.description}</p>

        <div style={styles.tagsContainer}>
          {project.techStack &&
            project.techStack.map((tech, index) => (
              <span key={index} style={styles.tag}>
                {tech}
              </span>
            ))}
        </div>

        <div style={styles.linksContainer}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              <FaGithub /> Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
