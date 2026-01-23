import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Sections/Hero";
import Projects from "./Sections/Projects";
import Skills from "./Sections/Skills";
import Contact from "./Sections/Contact";

import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  const styles = {
    appContainer: {
      backgroundColor: "#0a0e17",
      minHeight: "100vh",
      color: "white",
      fontFamily: "sans-serif",
      scrollBehavior: "smooth",
    },
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={styles.appContainer}>
              <Navbar />
              <main>
                <Hero />
                <Projects />
                <Skills />
                <Contact />
              </main>
              <footer
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#6b7280",
                  fontSize: "0.9rem",
                }}
              >
                <p>© 2026 Portfolio @Rotnen</p>
              </footer>
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
