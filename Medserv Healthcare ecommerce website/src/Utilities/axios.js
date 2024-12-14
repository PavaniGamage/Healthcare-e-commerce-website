import axios from "axios";

// Create an Axios instance with a default base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api",  
  timeout: 10000, // Optional: set timeout in case the request takes too long
  headers: {
    "Content-Type": "application/json",
    
  },
});

export default axiosInstance;
