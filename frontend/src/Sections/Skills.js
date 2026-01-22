import React, { useState, useEffect } from "react";
import API from "../api";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (name) => {
    if (!name) return null;

    const lowerName = name.toLowerCase();
    if (lowerName.includes("react")) return <FaReact color="#61DAFB" />;
    if (lowerName.includes("node")) return <FaNodeJs color="#339933" />;
    if (lowerName.includes("html")) return <FaHtml5 color="#E34F26" />;
    if (lowerName.includes("css")) return <FaCss3Alt color="#1572B6" />;
    if (lowerName.includes("javascript")) return <FaJs color="#F7DF1E" />;
    if (lowerName.includes("mongo")) return <SiMongodb color="#47A248" />;
    if (lowerName.includes("express")) return <SiExpress color="#ffffff" />;
    if (lowerName.includes("tailwind"))
      return <SiTailwindcss color="#06B6D4" />;
    if (lowerName.includes("type")) return <SiTypescript color="#3178C6" />;
    if (lowerName.includes("sql") || lowerName.includes("data"))
      return <FaDatabase color="#f29111" />;
    if (lowerName.includes("git")) return <FaGitAlt color="#F05032" />;
    if (lowerName.includes("python")) return <FaPython color="#3776AB" />;

    return (
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#ccc",
        }}
      />
    );
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await API.get("/skills");
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const styles = {
    section: {
      padding: "100px 20px",
      backgroundColor: "#0a0e17",
      position: "relative",
    },
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "60px",
    },
    title: {
      fontSize: "2.5rem",
      color: "white",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    subtitle: {
      color: "#8a2be2",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "24px",
    },
    card: {
      backgroundColor: "#111625",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: "24px 32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      minWidth: "140px",
      cursor: "default",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease",
    },
    iconWrapper: {
      fontSize: "3rem",
      marginBottom: "8px",
    },
    skillName: {
      color: "#e5e7eb",
      fontSize: "1.1rem",
      fontWeight: "500",
    },
  };

  return (
    <section id="skills" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.subtitle}>My Tech Stack</span>
          <h2 style={styles.title}>Skills & Expertise</h2>
        </div>

        <div style={styles.grid}>
          {loading ? (
            <p style={{ color: "white" }}>Loading Skills...</p>
          ) : (
            skills.map((skill, index) => (
              <motion.div
                key={skill._id || index}
                style={styles.card}
                whileHover={{
                  scale: 1.05,
                  borderColor: "#8a2be2",
                  boxShadow: "0 0 20px rgba(138, 43, 226, 0.3)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div style={styles.iconWrapper}>
                  {getIcon(skill.name || skill.title)}
                </div>
                <h3 style={styles.skillName}>{skill.name || skill.title}</h3>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
