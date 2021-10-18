import axios from "axios";

const API = axios.create({
  baseURL: 'http://thesoban.pl:4321',
  withCredentials: true
});

export default API;