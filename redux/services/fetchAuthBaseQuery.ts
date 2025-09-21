"use client";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const fetchGuestUserCookie = async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/generate-token`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

const fetchWithAuthBaseQuery = ({ baseUrl }: { baseUrl: string }) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        const newToken = await fetchGuestUserCookie();
        if (newToken) {
          Cookies.set("token", newToken);
          headers.set("Authorization", `Bearer ${newToken}`);
        }
      }
      return headers;
    },
  });
  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery(
        "/refresh-token",
        api,
        extraOptions,
      );
      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      }
    }
    return result;
  };
  return baseQueryWithReauth;
};

export default fetchWithAuthBaseQuery;
