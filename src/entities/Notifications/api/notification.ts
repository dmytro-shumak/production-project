import type { Notification } from "../model/types/notification";

import { rtkApi } from "@/shared/api";

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], null>({
      query: () => ({
        url: "./notifications",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery: useNotifications } = notificationApi;
