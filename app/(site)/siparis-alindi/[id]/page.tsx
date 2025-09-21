import { Metadata } from "next";
import OrderDetail from "../_components/OrderDetail";
import { Suspense } from "react";
import OrderReceivedLoadingSkeleton from "./loading";

export const metadata: Metadata = {
  title: "Siparişiniz Alındı - Sunayi",

  description: "This is Blog page for Solid Pro",
};

const OrderReceivedPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="max-w-c-1016 mx-auto mt-15 grid grid-cols-1 gap-4 px-4 md:px-8 lg:grid-cols-4 xl:mt-20 xl:px-0">
          <div className="col-span-1 lg:col-span-4">
            <h1 className="mb-8 text-3xl font-semibold text-black dark:text-white">
              Siparişiniz alındı
            </h1>
            <Suspense fallback={<OrderReceivedLoadingSkeleton />}>
              <OrderDetail id={id} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderReceivedPage;
