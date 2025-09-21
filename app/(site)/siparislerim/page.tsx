import { Metadata } from "next";
import GoBackButton from "./_components/GoBackButton";
import { Suspense } from "react";
import MiniLoaderSpinner from "@/components/MiniLoadingSpinner";

export const metadata: Metadata = {
  title: "Docs Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Docs page for Solid Pro",
};

const OrdersPage = async () => {
  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="max-w-c-1016 mx-auto mt-15 gap-4 px-4 md:px-8 lg:grid-cols-4 xl:mt-20 xl:px-0">
          <Suspense fallback={<MiniLoaderSpinner />}>
            <GoBackButton />
          </Suspense>
          <h1 className="my-8 flex text-3xl font-semibold text-black lg:col-span-4 dark:text-white">
            Tüm Siparişlerim
          </h1>
        </div>
      </section>
    </>
  );
};

export default OrdersPage;
