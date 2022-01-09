import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: 'http://localhost:4321',
  withCredentials: true
});

export default API;
