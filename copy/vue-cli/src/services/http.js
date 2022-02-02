import axios from "axios";
import store from "../store/index";
import opt from "../utils/opt"

//${store.getters?._getCurrentUser?.token}
const http = axios.create({
  baseURL: opt.baseURL,
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
