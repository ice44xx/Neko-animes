import axios from "axios";

const baseUrl = process.env.BASEURL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
