import axios from "axios";
import store from "../store/index";

//${store.getters?._getCurrentUser?.token}
const http = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_URL,
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    config.headers["X-CSRF-TOKEN"] = store.getters?._getCurrentUser?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.config?.errorHandle === false) {
      return Promise.reject(error);
    }

    //401, 404 etc
    //console.log(error.response.status);
  }
);

export default http;
