import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const styles = {
    nav: {
      position: "fixed",
      width: "100%",
      zIndex: 50,
      backgroundColor: "rgba(10, 14, 23, 0.8)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    flexWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      background: "linear-gradient(to right, #8a2be2, #d65db1)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      cursor: "pointer",
      textDecoration: "none",
    },
    desktopMenu: {
      display: "flex",
      alignItems: "center",
      gap: "32px",
    },
    navLink: {
      color: "#d1d5db",
      textDecoration: "none",
      fontSize: "0.875rem",
      fontWeight: 500,
      padding: "8px 12px",
      transition: "color 0.3s ease",
    },
    secretDot: {
      width: "6px",
      height: "6px",
      backgroundColor: "#374151",
      borderRadius: "50%",
      cursor: "pointer",
      marginLeft: "-15px",
      opacity: 0.6,
      transition: "opacity 0.3s ease",
    },
    mobileButton: {
      background: "none",
      border: "none",
      color: "#9ca3af",
      cursor: "pointer",
      padding: "8px",
    },
    mobileMenu: {
      backgroundColor: "#111625",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "8px 16px 16px 16px",
    },
    mobileLink: {
      display: "block",
      padding: "12px 16px",
      color: "#d1d5db",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: 500,
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.flexWrapper}>
          <div>
            <span style={styles.logo}>Portfolio.</span>
          </div>

          {!isMobile && (
            <div style={styles.desktopMenu}>
              {["Home", "Projects", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={styles.navLink}
                  onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.target.style.color = "#d1d5db")}
                >
                  {item}
                </a>
              ))}

              <div
                style={styles.secretDot}
                onClick={() => navigate("/login")}
                title="Admin Login"
                onMouseEnter={(e) => (e.target.style.opacity = "1")}
                onMouseLeave={(e) => (e.target.style.opacity = "0.6")}
              />
            </div>
          )}

          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={styles.mobileButton}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          )}
        </div>
      </div>

      {isMobile && isOpen && (
        <div style={styles.mobileMenu}>
          {["Home", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={styles.mobileLink}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
