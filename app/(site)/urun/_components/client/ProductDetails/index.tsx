"use client";
import { useGetPostQuery } from "@/redux/services/postApi";

const ProductDetails = ({ id }: { id: string }) => {
  const { data, isLoading, isSuccess } = useGetPostQuery(id);

  return <></>;
};

export default ProductDetails;
