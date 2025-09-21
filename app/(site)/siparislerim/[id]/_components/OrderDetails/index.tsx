"use client";
import {
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "@/redux/services/orderApi";
import OrderStatus from "@/types/orderStatus";
import OrderPostItem from "../OrderPostItem";
import { getStatusText } from "@/util/status";
import { useFormik } from "formik";
import * as Yup from "yup";
import Order from "@/types/order";
import OrderItem from "@/types/orderItem";
import UpdateOrderRequest from "@/types/updateOrderRequest";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import MiniLoaderSpinner from "@/components/MiniLoadingSpinner";

const OrderDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isSuccess } = useGetOrderQuery(id);
  const [order, setOrder] = useState<Order>();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [updateOrder, { isLoading, isSuccess: isUpdateOrderSuccess }] =
    useUpdateOrderMutation();

  const validationSchema = Yup.object({
    status: Yup.string()
      .oneOf(Object.values(OrderStatus))
      .required("Durum gerekli"),
    transportationCost: Yup.number()
      .typeError("Geçerli bir sayı girin")
      .min(0, "Negatif olamaz"),
    totalCost: Yup.number()
      .typeError("Geçerli bir sayı girin")
      .min(0, "Negatif olamaz"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: order?.status || OrderStatus.Pending,
      transportationCost: order?.transportationCost || 0,
      totalCost: order?.totalCost || 0,
    },
    validationSchema,
    onSubmit: (values) => {
      const updateRequest: UpdateOrderRequest = {
        id: id,
        transactionCost: values.transportationCost,
        totalCost: values.totalCost,
        status: values.status,
        orderItems: orderItems,
      };
      updateOrder(updateRequest);
      console.log("Update request:", updateRequest);
    },
  });

  const statusOptions = Object.values(OrderStatus);

  const updateOrderItem = (itemId: string, updatedItem: Partial<OrderItem>) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item,
      ),
    );
  };

  // Function to handle order item updates from child components
  const handleOrderItemUpdate = (
    itemId: string,
    field: keyof OrderItem,
    value: any,
  ) => {
    updateOrderItem(itemId, { [field]: value });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setOrder(data);
      // Initialize order items state with the fetched data
      setOrderItems(data.orderItems || []);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isUpdateOrderSuccess) {
      toast.success("Sipariş güncellendi", { position: "bottom-right" });
      //router.back();
    }
  }, [isUpdateOrderSuccess]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="dark:border-strokedark rounded-xl border bg-white p-4"
    >
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex gap-2 text-[14px]">
              <h4 className="text-lg font-bold text-black dark:text-white">
                {order?.displayId}
              </h4>
            </div>
            {order?.user?.name && (
              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  {`Kullanıcı: ${order.user.name} ${order.user.surname}`}
                </h4>
              </div>
            )}
            {order?.user?.email && (
              <div>
                <h4 className="font-semibold text-black dark:text-white">
                  {`Eposta: ${order.user.email}`}
                </h4>
              </div>
            )}

            <div className="grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Toplam Maliyet:
                </h4>
                <input
                  name="totalCost"
                  type="text"
                  value={formik.values.totalCost}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-28 rounded border px-2 py-1 dark:bg-gray-800"
                />
                {formik.touched.totalCost && formik.errors.totalCost && (
                  <div className="text-xs text-red-500">
                    {formik.errors.totalCost}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Nakliye Maliyeti:
                </h4>
                <input
                  name="transportationCost"
                  type="text"
                  value={formik.values.transportationCost}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-28 rounded border px-2 py-1 dark:bg-gray-800"
                />
                {formik.touched.transportationCost &&
                  formik.errors.transportationCost && (
                    <div className="text-xs text-red-500">
                      {formik.errors.transportationCost}
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Durum:
                </h4>
                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {getStatusText(status)}
                    </option>
                  ))}
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className="text-xs text-red-500">
                    {formik.errors.status}
                  </div>
                )}
              </div>

              {order?.createdAt && (
                <div className="flex gap-2">
                  <h4 className="font-semibold text-black dark:text-white">
                    Sipariş Tarihi:
                  </h4>
                  <h4 className="text-gray-600 dark:text-gray-300">
                    {new Intl.DateTimeFormat("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(order.createdAt as unknown as Date))}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700"
        >
          {isLoading ? <MiniLoaderSpinner /> : "Kaydet"}
        </button>
      </div>

      <div className="overflow-hidden">
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="space-y-4">
            <h5 className="font-semibold text-black dark:text-white">
              Sipariş Ürünleri:
            </h5>
            {orderItems && orderItems.length > 0 ? (
              <div className="space-y-4">
                {orderItems.map((value) => (
                  <OrderPostItem
                    key={value.id}
                    order={order!}
                    orderItem={value}
                    onUpdateOrderItem={handleOrderItemUpdate}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Bu siparişte ürün bulunmamaktadır.
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderDetails;
