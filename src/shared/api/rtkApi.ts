import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorageKeys } from "shared/constants/localStorage";
import { baseUrl } from "./api";

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageKeys.USER);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
