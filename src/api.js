import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-endpoint.com",
  timeout: 10000,
});

export default api;
