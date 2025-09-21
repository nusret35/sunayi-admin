import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nonAuthApi = createApi({
  reducerPath: "nonAuthApi",
  tagTypes: ["nonAuth"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/auth" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthenticationResponse, RegisterUserRequest>(
      {
        query: (body) => ({
          url: "/register",
          method: "POST",
          body,
        }),
        invalidatesTags: ["nonAuth"],
      },
    ),
    loginUser: builder.mutation<AuthenticationResponse, LoginUserRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["nonAuth"],
    }),
    logOutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["nonAuth"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
} = nonAuthApi;
