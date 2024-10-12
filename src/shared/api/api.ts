import axios from "axios";
import { LocalStorageKeys } from "shared/constants/localStorage";

// TODO: add env variables
const baseUrl = __DEV__
  ? "http://localhost:8000"
  : "https://production-project-server-one-psi.vercel.app/";

export const $api = axios.create({
  baseURL: baseUrl,
  headers: {
    authorization: localStorage.getItem(LocalStorageKeys.USER),
  },
});
