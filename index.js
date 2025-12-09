import axios from "axios";

export const API_BASE = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000
});

export default api;