"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { SheetMetalCuttingPost } from "@/types/post";
import { useGetRecentPostsQuery } from "@/redux/services/postApi";
import { useAddToBasketMutation } from "@/redux/services/basketApi";
import { toast } from "react-toastify";
import GetPostResponse from "@/types/getPostResponse";
import { useRouter } from "next/navigation";

// Move columns inside the component to access the mutation
const createColumns = (
  handleAddToCart: (postId: string) => void,
): ColumnDef<GetPostResponse>[] => [
  {
    accessorKey: "displayId",
    header: "ID",
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="flex w-48 items-center gap-x-4 dark:text-white">
          {"thumbnailImageUrl" in row.original.post ? (
            <Image
              alt="image"
              width={50}
              height={50}
              src={
                (row.original.post as SheetMetalCuttingPost).thumbnailImageUrl
              }
            />
          ) : (
            <></>
          )}
          <div className="capitalize">{row.original.post.displayId}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: () => <div>Tutar</div>,
    cell: ({ row }) => {
      if (!row.original.post.cost) {
        return <div className="font-medium dark:text-white">-</div>;
      }
      const amount = parseFloat(row.original.post.cost.toString() ?? "0");
      const formatted = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(amount);
      return <div className="font-medium dark:text-white">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div></div>,
    cell: ({ row }) => {
      const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row click navigation
        handleAddToCart(row.original.post.id);
      };

      return (
        <Button
          onClick={handleButtonClick}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 transition-all duration-150 active:scale-95 active:bg-gray-100 dark:active:bg-gray-700"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      );
    },
  },
];

export function PostsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, isLoading, isSuccess } = useGetRecentPostsQuery();
  const router = useRouter();

  const [
    addToBasket,
    { isLoading: isAddToBasketLoading, isSuccess: isAddToBasketSuccess },
  ] = useAddToBasketMutation();

  const handleAddToCart = (postId: string) => {
    addToBasket({ postId });
  };

  const columns = React.useMemo(() => createColumns(handleAddToCart), []);

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
  });

  React.useEffect(() => {
    if (isAddToBasketSuccess) {
      toast.success("Sepete eklendi", { position: "bottom-right" });
    }
  }, [isAddToBasketSuccess]);

  return (
    <>
      {/* Desktop UI - Unchanged */}
      <div className="hidden w-full md:block">
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        onClick={() =>
                          router.push(`/urun/${row.original.post.id}`)
                        }
                        className="h-16 w-72"
                        key={cell.id}
                      >
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
                    Henüz ürününüz yok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Enhanced Mobile UI */}
      <div className="space-y-4 md:hidden">
        {data?.map((item) => (
          <div
            key={item.post.id}
            className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between p-4 pb-3">
              <div className="flex items-center space-x-3">
                {"thumbnailImageUrl" in item.post ? (
                  <Image
                    alt="image"
                    width={50}
                    height={50}
                    src={(item.post as SheetMetalCuttingPost).thumbnailImageUrl}
                  />
                ) : (
                  <></>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {item.post.displayId}
                  </h3>
                </div>
              </div>
            </div>

            {/* Divider */}
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
                    {item.post.cost ? `${item.post.cost}₺` : "-"}
                  </p>
                </div>
              </div>

              {/* Add to Cart Button for Mobile */}
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => handleAddToCart(item.post.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 transition-all duration-150 active:scale-95 active:bg-gray-100 dark:active:bg-gray-700"
                  disabled={isAddToBasketLoading}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {isAddToBasketLoading ? "Ekleniyor..." : "Sepete ekle"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
