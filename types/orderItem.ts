import ItemStatus from "./itemStatus";
import {
  SheetMetalCuttingPost,
  SheetMetalFormingPost,
  SheetMetalPost,
} from "./post";

interface OrderItem {
  id: string;
  post: SheetMetalCuttingPost | SheetMetalFormingPost | SheetMetalPost;
  quantity: number;
  status: ItemStatus;
  orderId: string;
  comment: string;
  cost: number;
}

export default OrderItem;
