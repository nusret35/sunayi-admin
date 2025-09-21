import {
  useDeleteBasketItemMutation,
  useUpdateBasketItemMutation,
} from "@/redux/services/basketApi";
import Link from "next/link";
import { MdOutlineDelete } from "react-icons/md";
import MiniLoaderSpinner from "../MiniLoadingSpinner";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";

const BasketPost = ({ item }: { item: BasketItem }) => {
  const [updateBasketItem, { isSuccess }] = useUpdateBasketItemMutation();
  const [deleteBasketItem, { isLoading }] = useDeleteBasketItemMutation();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const debouncedUpdateQuantity = useCallback(
    debounce((newQuantity: number) => {
      if (newQuantity !== item.quantity) {
        updateBasketItem({
          basketItemId: item.id,
          quantity: newQuantity,
        });
      }
    }, 500),
    [item.id, item.quantity, updateBasketItem],
  );

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  useEffect(() => {
    if (quantity > 0) {
      debouncedUpdateQuantity(quantity);
    }
  }, [quantity, debouncedUpdateQuantity]);

  const deletePost = () => {
    toast.success("Ürün silindi", { position: "bottom-right" });
    deleteBasketItem({ postId: item.id });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="dark:border-strokedark rounded-xl border p-4">
      <div className="flex w-full">
        <img
          src={item.post.thumbnailImageUrl}
          alt="DXF Drawing"
          className="mr-4 h-auto w-[120px]"
        />
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="flex gap-2 text-[14px]">
              <h4 className="font-semibold text-black dark:text-white">
                Üretim tipi:
              </h4>
              <h4>Sac Metal Kesim</h4>
            </div>
            <div className="flex gap-2 text-[14px]">
              <h4 className="font-semibold text-black dark:text-white">
                Boyutlar:
              </h4>
              <h4>
                {1}mm x {1}mm x {1}mm
              </h4>
            </div>
            <div className="flex items-center gap-2 text-[14px]">
              <h4 className="font-semibold text-black dark:text-white">
                Saç kalınlığı:
              </h4>
              <h4>4 mm</h4>
            </div>
            <div className="flex gap-2 text-[14px]">
              <h4 className="font-semibold text-black dark:text-white">
                Malzeme:
              </h4>
            </div>
          </div>
          <div>
            <div className="mb-4 flex items-center gap-2 text-[14px]">
              <h4 className="font-semibold text-black dark:text-white">
                Miktar:
              </h4>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="flex justify-end">
              <div className="mt-2 flex gap-x-4">
                {isLoading ? (
                  <MiniLoaderSpinner />
                ) : (
                  <button
                    onClick={() => deletePost()}
                    className="text-primary flex cursor-pointer items-center dark:text-white"
                  >
                    <MdOutlineDelete size={18} />
                    <span>Sil</span>
                  </button>
                )}
                <Link
                  href={`/urun/${item.post.id}`}
                  className="bg-primary flex justify-center rounded-lg p-2 px-3 text-center text-sm text-white"
                >
                  Düzenle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPost;
