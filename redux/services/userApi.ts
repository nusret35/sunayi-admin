import User from "@/types/user";
import { authApi } from "./authApi";

const userApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/user/current-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
