"use client";

import { ReactElement, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Order from "@/types/order";
import { useRouter } from "next/navigation";
import {
  Post,
  SheetMetalCuttingPost,
  SheetMetalFormingPost,
} from "@/types/post";
import PrimaryButton from "@/components/PrimaryButton";
import StatusBadge from "@/components/StatusBadge";
import { AnimatePresence, motion } from "framer-motion";
import OrderStatus from "@/types/orderStatus";
import OrderItem from "@/types/orderItem";

const OrderEntry = ({ entry }: { entry: Order }) => {
  const router = useRouter();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const renderPostItem = (orderItem: OrderItem) => {
    const commonFields = (
      <div className="grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex gap-2">
          <span className="font-semibold text-black dark:text-white">ID:</span>
          <span className="text-gray-600 dark:text-gray-300">
            {orderItem.post.displayId}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-black dark:text-white">
            Miktar:
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {orderItem.quantity}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-black dark:text-white">
            Malzeme:
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {/*orderItem.post.material.value || "-"*/}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-black dark:text-white">
            Sonraki İşlem:
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {/*orderItem.post.nextProcess?.value || "-"*/}
          </span>
        </div>
        {entry.status === OrderStatus.Verified && (
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Birim maliyeti:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              ₺{orderItem.cost.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    );

    let specificFields: ReactElement | null = null;

    if ("name" in orderItem.post) {
      specificFields = (
        <div className="mt-2 grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              İsim:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {orderItem.post.name}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Miktar:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {orderItem.quantity}
            </span>
          </div>
          {orderItem.post.status && (
            <div className="flex gap-2">
              <span className="font-semibold text-black dark:text-white">
                Durum:
              </span>
              <StatusBadge status={orderItem.post.status} />
            </div>
          )}
        </div>
      );
    } else if ("sheetThickness" in orderItem.post) {
      const sheetMetalCuttingPost = orderItem.post as SheetMetalCuttingPost;
      specificFields = (
        <div className="mt-2 grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Sac Kalınlığı:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {sheetMetalCuttingPost.sheetThickness}mm
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Parça İşaretleme:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {sheetMetalCuttingPost.partMarking || "-"}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Ek Gereksinimler:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {sheetMetalCuttingPost.extraRequirements || "-"}
            </span>
          </div>
        </div>
      );
    } else if ("toleranceValue" in orderItem.post) {
      const sheetMetalFormingPost = orderItem.post as SheetMetalFormingPost;
      specificFields = (
        <div className="mt-2 grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Tolerans Değeri:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {sheetMetalFormingPost.toleranceValue}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Kılavuz ve Havşa:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {sheetMetalFormingPost.tappingAndCounterSkinning}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold text-black dark:text-white">
              Ek Gereksinimler:
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {sheetMetalFormingPost.extraRequirements || "-"}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        key={orderItem.post.id}
        className="border-b border-gray-200 pb-4 last:border-b-0 dark:border-gray-700"
      >
        {"thumbnailImageUrl" in orderItem.post &&
          orderItem.post.thumbnailImageUrl && (
            <div className="mb-2">
              <img
                src={orderItem.post.thumbnailImageUrl}
                alt="Ürün görseli"
                className="h-20 w-20 rounded-lg object-cover"
              />
            </div>
          )}
        {commonFields}
        {specificFields}
      </div>
    );
  };

  return (
    <div className="dark:border-strokedark rounded-xl border bg-white p-4">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex gap-2 text-[14px]">
              <h4 className="text-lg font-bold text-black dark:text-white">
                {entry.displayId}
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                {entry.status && (
                  <div className="flex gap-2">
                    <h4 className="font-semibold text-black dark:text-white">
                      Durum:
                    </h4>
                    <h4 className="text-gray-600 dark:text-gray-300">
                      <StatusBadge status={entry.status} />
                    </h4>
                  </div>
                )}
                {entry.totalCost && (
                  <div className="mt-2 flex gap-2">
                    <h4 className="font-semibold text-black dark:text-white">
                      Toplam Maliyet:
                    </h4>
                    <h4 className="text-gray-600 dark:text-gray-300">
                      ₺{entry.totalCost.toFixed(2)}
                    </h4>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={toggleAccordion}
                className="flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
              >
                <span>Ürünleri Göster ({entry.orderItems.length} ürün)</span>
                {isAccordionOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex h-full flex-col items-center gap-3 sm:flex-row lg:flex-col lg:items-end lg:justify-end xl:flex-row">
            <div className="flex w-full min-w-0 flex-col gap-2 lg:flex-row">
              <button
                onClick={() => router.push(`/siparislerim/${entry.id}`)}
                className="dark:bg-btndark text-primary cursor-pointer rounded-lg bg-gray-100 p-3 text-center whitespace-nowrap transition-colors hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
              >
                Detaylar
              </button>
              <PrimaryButton disabled={false} onClick={() => {}}>
                Siparişi Tekrarla
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAccordionOpen && (
          <motion.div
            key="accordion"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="space-y-4">
                <h5 className="font-semibold text-black dark:text-white">
                  Sipariş Ürünleri:
                </h5>
                {entry.orderItems.length > 0 ? (
                  <div className="space-y-4">
                    {entry.orderItems.map(renderPostItem)}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Bu siparişte ürün bulunmamaktadır.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderEntry;
