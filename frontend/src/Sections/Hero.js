import React, { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  const styles = {
    section: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0a0e17",
      background: "linear-gradient(to bottom right, #0a0e17, #130f40, #0a0e17)",
      position: "relative",
      overflow: "hidden",
      paddingTop: "64px",
    },
    blobPurple: {
      position: "absolute",
      top: "10%",
      left: "10%",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      backgroundColor: "rgba(138, 43, 226, 0.2)",
      filter: "blur(80px)",
      zIndex: 1,
    },
    blobPink: {
      position: "absolute",
      bottom: "10%",
      right: "10%",
      width: "350px",
      height: "350px",
      borderRadius: "50%",
      backgroundColor: "rgba(214, 93, 177, 0.1)",
      filter: "blur(80px)",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 10,
      textAlign: "center",
      padding: "0 20px",
      maxWidth: "800px",
    },
    subHeader: {
      color: "#8a2be2",
      fontWeight: "500",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "16px",
      display: "block",
    },
    header: {
      fontSize: "3.5rem",
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: "24px",
      lineHeight: "1.2",
    },
    gradientText: {
      background: "linear-gradient(to right, #8a2be2, #d65db1)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    paragraph: {
      color: "#9ca3af",
      fontSize: "1.25rem",
      marginBottom: "40px",
      lineHeight: "1.6",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "24px",
    },
    btnPrimary: {
      padding: "12px 32px",
      borderRadius: "9999px",
      background: "linear-gradient(to right, #8a2be2, #d65db1)",
      color: "white",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
      boxShadow: hoverPrimary ? "0 0 20px rgba(138, 43, 226, 0.5)" : "none",
      transition: "all 0.3s ease",
      opacity: hoverPrimary ? "0.9" : "1",
    },
    btnSecondary: {
      padding: "12px 32px",
      borderRadius: "9999px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      background: hoverSecondary ? "rgba(255,255,255,0.05)" : "transparent",
      color: "white",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
  };

  return (
    <section id="home" style={styles.section}>
      <div style={styles.blobPurple}></div>
      <div style={styles.blobPink}></div>

      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={styles.header}>Murotnen Goyit</span>
          <span style={styles.subHeader}>Back-End Developer</span>

          <h1 style={styles.header}>
            Building Digital <br />
            <span style={styles.gradientText}>Experiences</span>
          </h1>

          <p style={styles.paragraph}>
            Architecting Robust Server-Side Solutions Description: I build
            scalable APIs and secure database architectures that power
            high-performance applications. Specialized in Node.js, MongoDB, and
            system optimization.
          </p>

          <div style={styles.buttonGroup}>
            <a
              href="#projects"
              style={styles.btnPrimary}
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
            >
              View Work
            </a>
            <a
              href="#contact"
              style={styles.btnSecondary}
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
