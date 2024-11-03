import axios from "axios";
import { LocalStorageKeys } from "shared/constants/localStorage";

// TODO: add env variables
export const baseUrl = __DEV__
  ? "http://localhost:8000"
  : "https://production-project-server-one-psi.vercel.app/";

export const $api = axios.create({
  baseURL: baseUrl,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem(LocalStorageKeys.USER);
  }

  return config;
});
