import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggle
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Incorrect Password");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0a0e17",
      color: "white",
    },
    box: {
      padding: "40px",
      backgroundColor: "#1f2937",
      borderRadius: "10px",
      textAlign: "center",
      width: "350px",
    },
    inputWrapper: {
      position: "relative",
      width: "100%",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px 40px 12px 12px",
      borderRadius: "5px",
      border: "1px solid #374151",
      backgroundColor: "#111827",
      color: "#ffffff",
      fontSize: "16px",
      outline: "none",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#9ca3af",
      background: "none",
      border: "none",
      display: "flex",
      alignItems: "center",
    },
    btn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#8a2be2",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
    },
    error: {
      color: "#ef4444",
      marginTop: "15px",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <button type="submit" style={styles.btn}>
            Login
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
