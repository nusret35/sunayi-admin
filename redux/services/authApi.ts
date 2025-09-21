import { createApi } from "@reduxjs/toolkit/query/react";
import fetchWithAuthBaseQuery from "./fetchAuthBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["basket", "order", "post", "user", "address"],
  baseQuery: fetchWithAuthBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  }),
  endpoints: () => ({}),
});
