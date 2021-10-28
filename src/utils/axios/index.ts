import axios from "axios";

const API = axios.create({
  baseURL: 'https://workout-buddy.thesoban.pl/api',
  withCredentials: true
});

export default API;
