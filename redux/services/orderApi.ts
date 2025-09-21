import Page from "@/types/page";
import { authApi } from "./authApi";
import Order from "@/types/order";
import UpdateOrderRequest from "@/types/updateOrderRequest";

const orderApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation<string, void>({
      query: () => {
        return {
          url: "/order/add",
          method: "POST",
        };
      },
      invalidatesTags: ["order", "basket"],
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => {
        return {
          url: `/order/${id}`,
          method: "GET",
        };
      },
    }),
    getAllOrders: builder.query<Page<Order>, number>({
      query: (page) => ({
        url: `/order/admin/all?page=${page}`,
        method: "GET",
      }),
      keepUnusedDataFor: 300,
    }),
    getRecentOrders: builder.query<Order[], void>({
      query: () => {
        return {
          url: "/order/recent",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation<void, UpdateOrderRequest>({
      query: (body) => {
        return {
          url: "/order/admin/update-order",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useLazyGetOrderQuery,
  useGetOrderQuery,
  useGetAllOrdersQuery,
  useLazyGetAllOrdersQuery,
  useLazyGetRecentOrdersQuery,
  useGetRecentOrdersQuery,
  useUpdateOrderMutation,
} = orderApi;
