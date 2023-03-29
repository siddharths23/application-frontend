import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDestinations } from "../services/api";
import "../css/Explore.css";
const ExplorePage = () => {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations();
        setDestinations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDestinations();
  }, []);

  const handleDestinationClick = (title) => {
    navigate(`/plan?q=${title}`);
  };

  return (
    <div>
      <h1>Explore Destinations</h1>
      <div className="destination-list">
        {destinations.map((destination) => (
          <button
            className="destination-button"
            key={destination._id}
            onClick={() => handleDestinationClick(destination.title)}
          >
            {destination.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
