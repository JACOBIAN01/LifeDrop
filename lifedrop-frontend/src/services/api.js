import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change to your deployed URL later
});

// Attach Firebase Auth token for secured requests
API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token"); // store token after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
