import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ isAuthenticated, username, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav>
      <div className="logo-container">
        <Link to="/home">
          <img
            src="https://dummyimage.com/50x50/000/fff&text=TM"
            alt="TravelMate logo"
          />
          TravelMate
        </Link>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/explore">Explore</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogoutClick}>Logout ({username})</button>
          </>
        ) : (
          <>
            <Link to="/explore">Explore</Link>
            <Link to="/">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
