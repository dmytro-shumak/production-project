import { rtkApi } from "@/shared/api";
import type { Notification } from "../model/types/notification";

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
