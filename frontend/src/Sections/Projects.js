import React, { useEffect, useState } from "react";
import API from "../api";
import ProjectCard from "../Components/ProjectCard";

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
    header: { textAlign: "center", fontSize: "2.5rem", marginBottom: "60px" },
  };

  return (
    <section id="projects" style={styles.section}>
      <h2 style={styles.header}>My Work</h2>
      <div style={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
