import type { JsonSettings } from "../model/types/jsonSettings";
import type { User } from "../model/types/user";

import { rtkApi } from "@/shared/api";

interface SetJsonSettingsParams {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    setJsonSettings: builder.mutation<User, SetJsonSettingsParams>({
      query: ({ jsonSettings, userId }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: {
          jsonSettings,
        },
      }),
    }),
    getUserDataById: builder.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
