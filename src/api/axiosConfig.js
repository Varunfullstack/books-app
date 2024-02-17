import axios from "axios";

const BASE_URL = "http://localhost:3002"; // Your JSON Server URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
