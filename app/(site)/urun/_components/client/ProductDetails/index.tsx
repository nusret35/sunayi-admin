"use client";
import { useGetPostQuery } from "@/redux/services/postApi";
import SheetMetalProductDetails from "../SheetMetalProductDetails";
import { SheetMetalCuttingPost } from "@/types/post";

const ProductDetails = ({ id }: { id: string }) => {
  const { data, isLoading, isSuccess } = useGetPostQuery(id);

  return (
    <>
      {data?.type === "sheet_metal_cutting" && (
        <SheetMetalProductDetails
          product={data?.post as SheetMetalCuttingPost}
        />
      )}
    </>
  );
};

export default ProductDetails;
