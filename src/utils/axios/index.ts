import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: 'https://workout-buddy.thesoban.pl/api',
  withCredentials: true
});

export default API;
