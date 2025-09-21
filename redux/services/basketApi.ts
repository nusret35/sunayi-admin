import BasketRequest from "@/types/basketRequest";
import { authApi } from "./authApi";

const basketApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<BasketItem[], void>({
      keepUnusedDataFor: 5,
      query: () => {
        return {
          url: "/basket/user-basket",
          method: "GET",
        };
      },
      providesTags: ["basket"],
    }),
    addToBasket: builder.mutation<void, BasketRequest>({
      query: (body) => {
        return {
          url: "/basket/add",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["basket"],
    }),
    updateBasketItem: builder.mutation<void, UpdateBasketItemQuantityRequest>({
      query: (body) => {
        return {
          url: "/basket/update-quantity",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["basket"],
    }),
    deleteBasketItem: builder.mutation<void, BasketRequest>({
      query: (body) => {
        return {
          url: "/basket/delete",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["basket"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBasketQuery,
  useLazyGetBasketQuery,
  useAddToBasketMutation,
  useUpdateBasketItemMutation,
  useDeleteBasketItemMutation,
} = basketApi;
