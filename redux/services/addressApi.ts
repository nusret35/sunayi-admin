import { Address, AddressRequest, UpdateAddressRequest } from "@/types/address";
import { authApi } from "./authApi";
import { url } from "inspector";

const addressApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAddresses: builder.query<Address[], void>({
      query: () => {
        return {
          url: "/address/user-addresses",
          method: "GET",
        };
      },
      providesTags: ["address"],
    }),
    getDefaultAddress: builder.query<Address, void>({
      query: () => {
        return {
          url: "/address/default-address",
          method: "GET",
        };
      },
      providesTags: ["address"],
    }),
    addAddress: builder.mutation<void, AddressRequest>({
      query: (body) => {
        return {
          url: "/address/add-address",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["address"],
    }),
    updateAddress: builder.mutation<void, UpdateAddressRequest>({
      query: (body) => {
        return {
          url: "/address/update-address",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["address"],
    }),
    setDefaultAddress: builder.mutation<void, SetDefaultAddressRequest>({
      query: (body) => {
        return {
          url: "/address/set-default-address",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["address"],
    }),
  }),
});

export const {
  useGetUserAddressesQuery,
  useGetDefaultAddressQuery,
  useLazyGetUserAddressesQuery,
  useLazyGetDefaultAddressQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
