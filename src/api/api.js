import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3040/api",
  //baseURL: "https://api-distribuidora-ringo.up.railway.app/api",
  //baseURL: "https://cea1-181-4-99-78.sa.ngrok.io/api",
});

export default api;