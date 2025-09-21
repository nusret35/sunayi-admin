import OrderItem from "./orderItem";
import OrderStatus from "./orderStatus";
import { Post, SheetMetalCuttingPost, SheetMetalFormingPost } from "./post";
import User from "./user";

interface Order {
  id: string;
  displayId: string;
  transportationCost: number;
  totalCost: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  user: User;
  createdAt: string;
  updatedAt: string;
}

export default Order;
