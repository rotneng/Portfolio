import React, { useState } from "react";
import API from "../api";
import {
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaFileAlt, 
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await API.post("/contact", formData);

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const styles = {
    section: {
      padding: "100px 20px",
      backgroundColor: "#0a0e17",
      color: "white",
    },
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      gap: "60px",
      justifyContent: "center",
    },
    infoColumn: {
      flex: "1",
      minWidth: "300px",
      display: "flex",
      flexDirection: "column",
    },
    formColumn: {
      flex: "1.5",
      minWidth: "300px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    subtitle: {
      color: "#8a2be2",
      marginBottom: "10px",
      display: "block",
      fontWeight: "600",
      letterSpacing: "1px",
    },
    text: {
      color: "#9ca3af",
      marginBottom: "40px",
      lineHeight: "1.6",
    },
    infoItem: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "20px",
      color: "#e5e7eb",
    },
    cvButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "10px", 
      padding: "12px 24px",
      backgroundColor: "#1f2937", 
      color: "white",
      textDecoration: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      border: "1px solid #374151", 
      transition: "all 0.3s ease",
      width: "fit-content",
    },
    socialHeader: {
      marginTop: "auto",
      paddingTop: "40px",
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "16px",
      color: "white",
    },
    socialContainer: {
      display: "flex",
      gap: "20px",
    },
    socialLink: {
      color: "#9ca3af",
      fontSize: "24px",
      transition: "color 0.3s ease, transform 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    inputGroup: {
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#111625",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "white",
      outline: "none",
      fontSize: "1rem",
    },
    textarea: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#111625",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "white",
      outline: "none",
      fontSize: "1rem",
      minHeight: "150px",
      resize: "vertical",
    },
    button: {
      padding: "14px 32px",
      background: "linear-gradient(to right, #8a2be2, #d65db1)",
      border: "none",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      opacity: status === "submitting" ? 0.7 : 1,
    },
    statusMsg: {
      marginTop: "16px",
      padding: "10px",
      borderRadius: "6px",
      textAlign: "center",
      backgroundColor:
        status === "success"
          ? "rgba(72, 187, 120, 0.2)"
          : "rgba(245, 101, 101, 0.2)",
      color: status === "success" ? "#48bb78" : "#f56565",
    },
  };

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.infoColumn}>
          <div>
            <span style={styles.subtitle}>GET IN TOUCH</span>
            <h2 style={styles.title}>Let's Work Together</h2>
            <p style={styles.text}>
              Have a project in mind or just want to say hi? Feel free to send
              me a message. I am currently open to new opportunities.
            </p>

            <div style={styles.infoItem}>
              <FaEnvelope color="#8a2be2" size={20} />
              <span>rotneng@gmail.com</span>
            </div>
            <div style={styles.infoItem}>
              <FaMapMarkerAlt color="#8a2be2" size={20} />
              <span>Jos, Nigeria</span>
            </div>

            <a
              href="https://instantfind.me/rotnen"
              target="_blank"
              rel="noreferrer"
              style={styles.cvButton}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#8a2be2";
                e.target.style.color = "#8a2be2";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#374151";
                e.target.style.color = "white";
              }}
            >
              <FaFileAlt /> View My Resume
            </a>
          </div>

          <div>
            <h3 style={styles.socialHeader}>Connect with me</h3>
            <div style={styles.socialContainer}>
              <a
                href="https://www.linkedin.com/in/murotnen-goyit-410582256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => (e.target.style.color = "#0077b5")}
                onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
              >
                <FaLinkedin size={28} />
              </a>

              <a
                href="https://github.com/rotneng"
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
              >
                <FaGithub size={28} />
              </a>

              <a
                href="https://x.com/rotnen_10?s=21"
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => (e.target.style.color = "#1DA1F2")}
                onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
              >
                <FaTwitter size={28} />
              </a>

              <a
                href="https://www.instagram.com/goyit_murotnen?igsh=MXZ2bDdsZG12bzJvbw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => (e.target.style.color = "#E1306C")}
                onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
              >
                <FaInstagram size={28} />
              </a>

              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => (e.target.style.color = "#25D366")}
                onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
              >
                <FaWhatsapp size={28} />
              </a>
            </div>
          </div>
        </div>

        <div style={styles.formColumn}>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              style={styles.button}
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
              <FaPaperPlane />
            </button>

            {status === "success" && (
              <div style={styles.statusMsg}>Message sent successfully!</div>
            )}
            {status === "error" && (
              <div style={styles.statusMsg}>
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
