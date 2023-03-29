import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/plan?q=${searchQuery}`);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Travel Planner</h1>
      <form className="search-container" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Search destination"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default HomePage;
