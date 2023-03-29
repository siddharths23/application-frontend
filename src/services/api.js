import axios from "axios";

const api = axios.create({
  baseURL: "https://application-api-yly9.onrender.com/api",
});

// Authentication
export const loginUser = (userData) => api.post("/users/login", userData);
export const registerUser = (userData) => api.post("/users/register", userData);

// Destinations
export const getDestinations = () => api.get("/destinations");

export const getUserPlans = () =>
  api.get("/users/plans", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const saveUserPlan = async (planData) => {
  try {
    const response = await api.post("/users/plans", planData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUserPlan = (planId) =>
  api.delete(`/users/plans/${planId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const searchDestination = async (query) => {
  try {
    const response = await api.get("/destinations", {
      params: { q: query },
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
