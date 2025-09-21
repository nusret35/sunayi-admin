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
import Image from "next/image";

const data: Message[] = [
  {
    id: "m5gr84i9",
    title: "Siparişiniz yola çıktı!",
    date: new Date(),
    status: "Okundu",
  },
  {
    id: "m5gr84i94",
    title: "Siparişiniz yola çıktı 2!",
    date: new Date(),
    status: "Okunmadı",
  },
  {
    id: "m5gr84i95",
    title: "Siparişiniz yola çıktı 2!",
    date: new Date(),
    status: "Okunmadı",
  },
];

export type Message = {
  id: string;
  title: string;
  date: Date;
  status: string;
};

const src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0NMFM-KVAUM7DmWasxYRFmTlH6BqjDo740g&s";

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex w-48 items-center capitalize dark:text-white">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("date");
      if (dateValue) {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(dateValue as Date));
        return (
          <div className="w-48 capitalize dark:text-white">{formattedDate}</div>
        );
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.getValue("status")) {
        return (
          <div className="text-green-700 capitalize">
            {row.getValue("status")}
          </div>
        );
      }
    },
  },
];

export function MessagesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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

  const formatDate = (dateValue: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateValue));

  return (
    <>
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
                    Mesajınız yok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="md:hidden">
        {data.map((cell) => (
          <div
            key={cell.id}
            className="bg-alabaster dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark z-40 mb-4 cursor-pointer items-center rounded-lg border border-white p-3 py-4 transition-all xl:p-12.5"
          >
            <h4 className="xl:text-itemtitle text-regular text-black dark:text-white">
              {cell.title}
            </h4>
            <p className="text-sm">
              {formatDate(cell.date)} • {cell.status}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
