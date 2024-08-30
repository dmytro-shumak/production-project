import axios from "axios";
import { LocalStorageKeys } from "shared/constants/localStorage";

const baseUrl = __DEV__ ? "http://localhost:8000" : "https://production.com";

export const $api = axios.create({
  baseURL: baseUrl,
  headers: {
    authorization: localStorage.getItem(LocalStorageKeys.USER),
  },
});
