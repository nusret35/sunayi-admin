import { Metadata } from "next";
import OrderDetails from "./_components/OrderDetails";
import GoBackButton from "../../ilanlarim/_components/GoBackButton";

export const metadata: Metadata = {
  title: "Sipariş - Sunayi",

  description: "Sipariş detayı",
};

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="max-w-c-1016 mx-auto mt-15 grid grid-cols-1 gap-4 px-4 md:px-8 lg:grid-cols-4 xl:mt-20 xl:px-0">
          <div className="col-span-1 lg:col-span-4">
            <GoBackButton goBackPath="/panel" />
            <h1 className="mt-8 mb-8 text-3xl font-semibold text-black dark:text-white">
              Sipariş
            </h1>
            <OrderDetails id={id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
