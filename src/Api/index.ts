import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Baerer ${localStorage.getItem("token")}`,
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Baerer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
