"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetBasketQuery } from "@/redux/services/basketApi";
import BasketPost from "@/components/BasketPost";
import BasketLoadingSkeleton from "../loading";
import { useAddOrderMutation } from "@/redux/services/orderApi";
import PrimaryButton from "@/components/PrimaryButton";
import MiniLoaderSpinner from "@/components/MiniLoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const BasketComponentClient = () => {
  const [addOrder, { isLoading: isLoadingAddOrder }] = useAddOrderMutation();
  const [thicknessInput, setThicknessInput] = useState<string>("2");
  const [quantity, setQuantity] = useState<string>("1");
  const partCost = 1 * 1 * Number(thicknessInput) * 0.0012;
  const partCostTimesQuantity = partCost * Number(quantity);
  const cargoCost = 24;
  const totalCost = partCostTimesQuantity + cargoCost;
  const router = useRouter();

  const dropdownItems = [
    { id: 0, name: "Çelik" },
    { id: 1, name: "Alüminyum" },
  ];

  const { data, isLoading } = useGetBasketQuery();

  const handleAddOrder = async () => {
    const id = await addOrder().unwrap();
    if (id) {
      router.push(`/siparis-alindi/${id}`);
    }
  };

  if (isLoading) {
    return <BasketLoadingSkeleton />;
  }

  return (
    <section className="relative mx-4 py-20 lg:py-25 xl:py-30 2xl:px-0">
      <div className="max-w-c-1390 mx-auto mt-8 grid w-full grid-cols-1 gap-4 lg:grid-cols-8">
        <div className="lg:col-span-5">
          <div className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection w-full rounded-lg border border-white bg-white p-8 transition-all">
            <div className="flex justify-end">
              <Link
                href="/teklif-al"
                className="dark:bg-btndark text-primary mr-2 cursor-pointer rounded-lg bg-gray-100 p-3 dark:text-white"
              >
                + Yeni ürün ekle
              </Link>
              <Link
                href="/ilanlarim?geri-don=sepet"
                className="dark:bg-btndark bg-primary cursor-pointer rounded-lg p-3 text-white dark:text-white"
              >
                Ürünlerim
              </Link>
            </div>
            {data &&
              data.map((value, index) => (
                <div key={index} className="my-4">
                  <BasketPost item={value} />
                </div>
              ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark sticky top-26 h-fit rounded-lg border border-white bg-white p-8 transition-all">
            <h3 className="dxl:text-itemtitle mb-5 text-xl font-semibold text-black dark:text-white">
              Sepet Özeti
            </h3>
            <div className="flex justify-between">
              <h4 className="mb-5 text-sm text-black dark:text-white">
                {quantity} parça
              </h4>
              <h4 className="mb-5 text-sm text-black dark:text-white">
                ₺{partCostTimesQuantity.toFixed(2)}
              </h4>
            </div>
            <div className="flex justify-between">
              <h4 className="text-sm text-black dark:text-white">
                Kargo ücreti
              </h4>
              <h4 className="text-sm text-black dark:text-white">
                ₺{cargoCost.toFixed(2)}
              </h4>
            </div>
            <div className="my-4 h-[0.1px] w-full bg-gray-500" />
            <div className="mb-8 flex rounded-xl bg-[#cce6ff] p-4 text-[#004080]">
              <span>
                Siparişiniz tamamlandıktan sonra onay sürecine alınacaktır. Onay
                sürecinin ardından size bir teklif sunulacaktır. Teklifi kabul
                etmeniz dahilinde siparişiniz hazırlanacaktır.
              </span>
            </div>
            <PrimaryButton
              disabled={!data || data?.length <= 0}
              className="text-regular flex w-full justify-center p-3"
              onClick={handleAddOrder}
            >
              {isLoadingAddOrder ? <MiniLoaderSpinner /> : "Siparişi tamamla"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasketComponentClient;
