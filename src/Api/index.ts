import axios from "axios";

export const api = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
    Content: "application/json",
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
