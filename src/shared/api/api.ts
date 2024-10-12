import axios from "axios";
import { LocalStorageKeys } from "shared/constants/localStorage";

// TODO: add env variables
const baseUrl = __DEV__
  ? "http://localhost:8000"
  : "https://production-project-server-ogu2yps4v-shumak69s-projects.vercel.app";

export const $api = axios.create({
  baseURL: baseUrl,
  headers: {
    authorization: localStorage.getItem(LocalStorageKeys.USER),
  },
});
