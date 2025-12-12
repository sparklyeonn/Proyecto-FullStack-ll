import axios from "axios";

const api = axios.create({
  baseURL: "http://18.206.208.70:8080/api", // IP BACKEND EC2
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
