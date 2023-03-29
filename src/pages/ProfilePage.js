import React, { useState, useEffect } from "react";
import { getUserPlans, deleteUserPlan } from "../services/api";

const ProfilePage = () => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await getUserPlans();
      setPlans(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      await deleteUserPlan(planId);
      fetchPlans();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div>
      <h1>Your Saved Plans</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            <h2>{plan.title}</h2>
            <p>{plan.description}</p>
            <button onClick={() => handleDeletePlan(plan._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
