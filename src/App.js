import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import PlanPage from "./pages/PlanPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsLoggedIn(true);
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error(error);
          setIsLoggedIn(false);
          setUsername("");
          localStorage.removeItem("token");
        });
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogin = (token, username) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/plan" element={<PlanPage userId={username} />} />
        <Route path="/profile" element={<ProfilePage userId={username} />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </Router>
  );
};

export default App;
