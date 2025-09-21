import OrderStatus from "@/types/orderStatus";

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Delivered:
        return "text-xs md:text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case OrderStatus.Pending:
        return "text-xs md:text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case OrderStatus.Verified:
        return "text-xs md:text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case OrderStatus.Rejected:
        return "text-xs md:text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case OrderStatus.Shipped:
        return "text-xs md:text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case OrderStatus.Cancelled:
        return "text-xs md:text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case OrderStatus.Returned:
        return "text-xs md:text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case OrderStatus.ActionRequired:
        return "text-xs md:text-sm bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case OrderStatus.InProduction:
        return "text-xs md:text-sm bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
      default:
        return "text-xs md:text-sm bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Delivered:
        return "Teslim Edildi";
      case OrderStatus.Pending:
        return "Beklemede";
      case OrderStatus.Verified:
        return "Teklif Hazır";
      case OrderStatus.Rejected:
        return "Reddedildi";
      case OrderStatus.Shipped:
        return "Kargoya Verildi";
      case OrderStatus.Cancelled:
        return "İptal Edildi";
      case OrderStatus.Returned:
        return "İade Edildi";
      case OrderStatus.ActionRequired:
        return "Aksiyon Gerekli";
      case OrderStatus.InProduction:
        return "Üretimde";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(status)}`}
    >
      {getStatusText(status)}
    </span>
  );
};
export default StatusBadge;
