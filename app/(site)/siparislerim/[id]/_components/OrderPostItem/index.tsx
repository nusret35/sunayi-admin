import StatusBadge from "@/components/StatusBadge";
import ItemStatus from "@/types/itemStatus";
import Order from "@/types/order";
import OrderItem from "@/types/orderItem";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Field = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex gap-2">
    <span className="font-semibold text-black dark:text-white">{label}:</span>
    <span className="text-gray-600 dark:text-gray-300">{value}</span>
  </div>
);

interface OrderPostItemProps {
  order: Order;
  orderItem: OrderItem;
  onUpdateOrderItem: (
    itemId: string,
    field: keyof OrderItem,
    value: any,
  ) => void;
}

const OrderPostItem = ({
  orderItem,
  onUpdateOrderItem,
}: OrderPostItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded((prev) => !prev);
  const [cost, setCost] = useState(
    orderItem.cost ? orderItem.cost.toString() : "",
  );
  const [status, setStatus] = useState<ItemStatus>(orderItem.status);
  const [rejectionComment, setRejectionComment] = useState(
    orderItem.comment || "",
  );

  const handleStatusChange = (newStatus: ItemStatus) => {
    setStatus(newStatus);
    if (newStatus === ItemStatus.APPROVED) {
      onUpdateOrderItem(orderItem.id, "status", ItemStatus.APPROVED);
    } else {
      onUpdateOrderItem(orderItem.id, "status", ItemStatus.REJECTED);
      setRejectionComment("");
      onUpdateOrderItem(orderItem.id, "comment", "");
    }
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCost = e.target.value;
    setCost(newCost);
    const numericCost = parseFloat(newCost) || 0;
    onUpdateOrderItem(orderItem.id, "cost", numericCost);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setRejectionComment(newComment);
    onUpdateOrderItem(orderItem.id, "comment", newComment);
  };

  return (
    <div
      key={orderItem.post.id}
      className="border-b border-gray-200 pb-4 last:border-b-0 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {"thumbnailImageUrl" in orderItem.post &&
            orderItem.post.thumbnailImageUrl && (
              <img
                src={orderItem.post.thumbnailImageUrl}
                alt="Ürün görseli"
                className="h-20 w-20 rounded-lg object-cover"
              />
            )}
          <div className="space-y-1 text-sm">
            <div className="text-black dark:text-white">
              <strong>ID:</strong> {orderItem.post.displayId}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <strong>Miktar:</strong> {orderItem.quantity}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <label className="text-sm font-semibold text-black dark:text-white">
                Birim Maliyeti:
              </label>
              <input
                type="number"
                name="cost"
                value={cost}
                onChange={handleCostChange}
                className="w-24 rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <span className="text-gray-400">₺</span>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center text-sm text-blue-600 dark:text-blue-400"
        >
          {expanded ? "Küçült" : "Detayları Göster"}
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Status Radio Buttons */}
      <div className="mt-3 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={`approve-${orderItem.post.id}`}
            name={`status-${orderItem.post.id}`}
            checked={status === ItemStatus.APPROVED}
            onChange={() => handleStatusChange(ItemStatus.APPROVED)}
            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800"
          />
          <label
            htmlFor={`approve-${orderItem.post.id}`}
            className="text-sm font-medium text-green-600 dark:text-green-400"
          >
            Onayla
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={`reject-${orderItem.post.id}`}
            name={`status-${orderItem.post.id}`}
            checked={status === ItemStatus.REJECTED}
            onChange={() => handleStatusChange(ItemStatus.REJECTED)}
            className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800"
          />
          <label
            htmlFor={`reject-${orderItem.post.id}`}
            className="text-sm font-medium text-red-600 dark:text-red-400"
          >
            Reddet
          </label>
        </div>
      </div>

      {/* Rejection Comment Text Area */}
      <AnimatePresence>
        {status === ItemStatus.REJECTED && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-3 overflow-hidden"
          >
            <div className="space-y-2">
              <label
                htmlFor={`comment-${orderItem.post.id}`}
                className="block text-sm font-medium text-black dark:text-white"
              >
                Reddetme Gerekçesi:
              </label>
              <textarea
                id={`comment-${orderItem.post.id}`}
                value={rejectionComment}
                onChange={handleCommentChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                placeholder="Lütfen reddetme gerekçenizi belirtiniz..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="accordion"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-3 space-y-3 overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Malzeme"
                value={orderItem.post.material.value || "-"}
              />
              <Field
                label="Sonraki İşlem"
                value={orderItem.post.nextProcess?.value || "-"}
              />
            </div>

            {"name" in orderItem.post && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="İsim" value={orderItem.post.name} />
                <Field label="Miktar" value={orderItem.post.amount} />
                {orderItem.post.status && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-black dark:text-white">
                      Durum:
                    </span>
                    <StatusBadge status={orderItem.post.status} />
                  </div>
                )}
              </div>
            )}

            {"sheetThickness" in orderItem.post && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <Field
                  label="Sac Kalınlığı"
                  value={`${orderItem.post.sheetThickness}mm`}
                />
                <Field
                  label="Parça İşaretleme"
                  value={orderItem.post.partMarking || "-"}
                />
                <Field
                  label="Ek Gereksinimler"
                  value={orderItem.post.extraRequirements || "-"}
                />
                <Link
                  className="text-primary"
                  href={orderItem.post.sketchDocumentUrl}
                >
                  Tasarımı İndir
                </Link>
              </div>
            )}

            {"toleranceValue" in orderItem.post && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <Field
                  label="Tolerans Değeri"
                  value={orderItem.post.toleranceValue}
                />
                <Field
                  label="Kılavuz ve Havşa"
                  value={orderItem.post.tappingAndCounterSkinning}
                />
                <Field
                  label="Ek Gereksinimler"
                  value={orderItem.post.extraRequirements || "-"}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderPostItem;
