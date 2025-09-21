import React, { Suspense } from "react";
import {
  MoreHorizontal,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import CardTitle from "@/components/CardTitle";
import CardHeader from "@/components/CardHeader";
import Card from "@/components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardContent from "@/components/CardContent";
import Badge from "@/components/Badge";
import AllOrders from "@/components/AllOrders";

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

const recentTransactions = [
  {
    id: 1,
    user: "John Doe",
    amount: "$29.99",
    status: "Completed",
    date: "2024-01-15",
    method: "Credit Card",
  },
  {
    id: 2,
    user: "Jane Smith",
    amount: "$9.99",
    status: "Completed",
    date: "2024-01-14",
    method: "PayPal",
  },
  {
    id: 3,
    user: "Mike Johnson",
    amount: "$99.99",
    status: "Failed",
    date: "2024-01-13",
    method: "Credit Card",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    amount: "$199.99",
    status: "Completed",
    date: "2024-01-12",
    method: "Bank Transfer",
  },
  {
    id: 5,
    user: "Tom Brown",
    amount: "$9.99",
    status: "Pending",
    date: "2024-01-11",
    method: "Credit Card",
  },
];

const analytics = [
  { metric: "Total Users", value: "2,543", change: "+12.3%", icon: Users },
  { metric: "Revenue", value: "$45,231", change: "+18.7%", icon: DollarSign },
  { metric: "Growth Rate", value: "23.1%", change: "+5.2%", icon: TrendingUp },
  {
    metric: "Active Sessions",
    value: "1,847",
    change: "+8.1%",
    icon: Activity,
  },
];

// Button component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Dashboard() {
  return (
    <div className="m-20 my-32 min-h-screen text-black">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold"></h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto space-y-6 p-6">
        {/* Analytics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {analytics.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.metric}
                  </CardTitle>
                  <Icon className="text-muted-foreground h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-muted-foreground text-xs">
                    <span className="text-green-600">{item.change}</span> from
                    last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tables Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active" ? "success" : "secondary"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.plan}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{transaction.user}</div>
                          <div className="text-muted-foreground text-sm">
                            {transaction.method}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Completed"
                              ? "success"
                              : transaction.status === "Failed"
                                ? "destructive"
                                : "warning"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Suspense>
          <AllOrders />
        </Suspense>
      </div>
    </div>
  );
}
