import OrderStatus from "@/types/orderStatus";

export const getStatusText = (status: OrderStatus) => {
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
