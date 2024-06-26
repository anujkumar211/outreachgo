import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_VUE_API,
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
