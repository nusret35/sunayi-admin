import OrderItem from "./orderItem";
import OrderStatus from "./orderStatus";

interface UpdateOrderRequest {
  id: string;
  transactionCost: number;
  totalCost: number;
  status: OrderStatus;
  orderItems: OrderItem[];
}

export default UpdateOrderRequest;
