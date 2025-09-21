"use client";
import Card from "../Card";
import CardContent from "../CardContent";
import CardHeader from "../CardHeader";
import CardTitle from "../CardTitle";
import { OrdersTable } from "../OrdersTable";

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    plan: "Pro",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    plan: "Basic",
    joined: "2024-01-14",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "Inactive",
    plan: "Pro",
    joined: "2024-01-13",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    status: "Active",
    plan: "Enterprise",
    joined: "2024-01-12",
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom@example.com",
    status: "Active",
    plan: "Basic",
    joined: "2024-01-11",
  },
];

const AllOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tüm Siparişler</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersTable />
      </CardContent>
    </Card>
  );
};

export default AllOrders;
