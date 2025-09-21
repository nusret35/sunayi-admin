"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Order from "@/types/order";
import { useGetAllOrdersQuery } from "@/redux/services/orderApi";
import StatusBadge from "../StatusBadge";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <div className="flex w-32 items-center gap-x-4 dark:text-white">
          <div className="capitalize">{row.original.displayId}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => {
      console.log(row.original);
      if (row.original.status) {
        return <StatusBadge status={row.original.status} />;
      }
    },
  },
  {
    accessorKey: "totalCost",
    header: () => <div>Tutar</div>,
    cell: ({ row }) => {
      if (!row.original.totalCost) {
        return <div className="font-medium dark:text-white"> - </div>;
      }
      const amount = parseFloat(
        row.original.totalCost ? row.original.totalCost.toString() : "0",
      );
      const formatted = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(amount);
      return <div className="font-medium dark:text-white">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Sipariş Tarihi</div>,
    cell: ({ row }) => {
      const dateValue = row.original.createdAt;
      if (dateValue) {
        const formattedDate = new Intl.DateTimeFormat("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(dateValue as unknown as Date));
        return (
          <div className="w-48 capitalize dark:text-white">{formattedDate}</div>
        );
      }
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div>Güncellenme Tarihi</div>,
    cell: ({ row }) => {
      const dateValue = row.original.updatedAt;
      if (dateValue) {
        const formattedDate = new Intl.DateTimeFormat("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(dateValue as unknown as Date));
        return (
          <div className="w-48 capitalize dark:text-white">{formattedDate}</div>
        );
      }
    },
  },
];

export function OrdersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(0);

  const router = useRouter();

  // Use the query directly with current page
  const {
    data: pageData,
    isLoading,
    isError,
  } = useGetAllOrdersQuery(currentPage);

  const orders = pageData?.content || [];
  const totalPages = pageData?.totalPages || 0;
  const totalElements = pageData?.totalElements || 0;

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    pageCount: totalPages,
  });

  const handleRowClick = (id: string) => {
    router.push(`/siparislerim/${id}`);
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Siparişler yüklenirken bir hata oluştu.
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="dark:border-titlebgdark border">
          <Table>
            <TableHeader className="dark:bg-strokedark bg-alabaster">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Yükleniyor...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleRowClick(row.original.id)}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="h-16 w-72" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Henüz siparişiniz yok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm dark:text-gray-400">
            Toplam {totalElements} sipariş
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium dark:text-white">
              Sayfa {currentPage + 1} / {totalPages || 1}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => goToPage(0)}
                disabled={!canPreviousPage || isLoading}
              >
                <span className="sr-only">İlk sayfaya git</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => goToPage(currentPage - 1)}
                disabled={!canPreviousPage || isLoading}
              >
                <span className="sr-only">Önceki sayfa</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => goToPage(currentPage + 1)}
                disabled={!canNextPage || isLoading}
              >
                <span className="sr-only">Sonraki sayfa</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => goToPage(totalPages - 1)}
                disabled={!canNextPage || isLoading}
              >
                <span className="sr-only">Son sayfaya git</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {orders?.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700"
            onClick={() => handleRowClick(item.id)}
          >
            <div className="flex items-center justify-between p-4 pb-3">
              <div className="flex items-center space-x-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {item.displayId}
                  </h3>
                </div>
              </div>
            </div>

            <div className="mx-4 h-px bg-gray-100 dark:bg-gray-700"></div>

            <div className="p-4 pt-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Tutar
                    </span>
                  </div>
                  <p className="text-lg text-black dark:text-white">
                    {item.totalCost ? `${item.totalCost}₺` : "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      Durum
                    </span>
                  </div>
                  {item.status && <StatusBadge status={item.status} />}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile pagination */}
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(currentPage - 1)}
            disabled={!canPreviousPage || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium dark:text-white">
            {currentPage + 1} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(currentPage + 1)}
            disabled={!canNextPage || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
