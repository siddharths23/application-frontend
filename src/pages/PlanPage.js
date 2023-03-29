import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchDestination, saveUserPlan } from "../services/api";
import "../css/Plan.css";

const PlanPage = ({ userId }) => {
  const [destination, setDestination] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const navigate = useNavigate();

  const fetchDestination = async () => {
    try {
      const response = await searchDestination(searchQuery);
      if (response.data.length > 0) {
        setDestination(response.data[0]);
      } else {
        setDestination(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePlan = async (e) => {
    e.preventDefault();

    try {
      const planData = {
        title: destination.title,
        description: destination.description,
        dayPlans: destination.dayPlans,
      };
      await saveUserPlan(planData, userId);
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchDestination();
    }
  }, [searchQuery]);

  return (
    <div className="plan-container">
      {destination ? (
        <>
          <h1 className="destination-title">{destination.title}</h1>
          <p className="destination-description">{destination.description}</p>
          <ul className="day-plans">
            {destination.dayPlans.map((dayPlan) => (
              <li key={dayPlan}>{dayPlan}</li>
            ))}
          </ul>
          <button className="save-plan-button" onClick={handleSavePlan}>
            Save Plan
          </button>
        </>
      ) : (
        <p>No destination found.</p>
      )}
    </div>
  );
};

export default PlanPage;
