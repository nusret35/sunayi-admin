"use client";
import { useGetOrderQuery } from "@/redux/services/orderApi";
import SimpleOrderDetailSkeleton from "../DetailSkeleton";

const OrderDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetOrderQuery(id);

  if (isLoading) {
    return <SimpleOrderDetailSkeleton />;
  }

  return (
    <span>
      Sipariş numaranız <strong>{data?.displayId}</strong>. Ürünleriniz
      onaylandıktan sonra size bir teklif sunulacaktır. Teklifi kabul etmeniz
      dahilinde ödeme ekranına yönlendirileceksiniz. Siparişiniz onaylandığı
      zaman sizinle iletişime geçeceğiz.{" "}
    </span>
  );
};

export default OrderDetail;
