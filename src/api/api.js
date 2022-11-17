import axios from "axios";




const api = axios.create({
 
  baseURL: "http://localhost:3040/api",
 
  //baseURL: "https://api-distribuidora-ringo.up.railway.app/api",
  //baseURL: "https://cea1-181-4-99-78.sa.ngrok.io/api",
});

export default api; 


const BASE_URL = "http://localhost:3040/api";


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  header: { "x-token": `${TOKEN}` },
});