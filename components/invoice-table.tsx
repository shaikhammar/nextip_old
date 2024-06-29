"use client";

import Link from "next/link";
import { Invoice } from "@/lib/types/invoice";
import { ColumnDef } from "@tanstack/react-table";
import { Prisma } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Payment } from "@/lib/types/payment";

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "status",
    enableGlobalFilter: true,
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Badge variant="outline">{row.getValue("code")}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "invoiceNumber",
    enableGlobalFilter: true,
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "client.name",
    enableGlobalFilter: true,
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "invoiceTotal",
    enableGlobalFilter: true,
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    // accessorKey: "currency.code",
    id: "balance",
    accessorFn: (invoice) => {
      const balance =
        parseFloat(invoice.invoiceTotal.toString()) -
        invoice.payment.reduce(
          (acc: number, payment) =>
            acc + parseFloat(payment.amountReceived.toString()),
          0
        );
      const balanceNumber = parseFloat(balance.toString());
      const formattedBalance = balanceNumber.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return `${invoice.client.currency.code} ${formattedBalance}`;
    },
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Balance
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: (props) => (
      <div className="text-right mr-4 font-medium">{`${props.getValue()}`}</div>
    ),
  },
  {
    accessorKey: "invoiceDate",
    enableGlobalFilter: true,
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(client.clientId.toString())
              }
            >
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/client/${client.clientId}/edit`}>
              <DropdownMenuItem className="cursor-pointer">
                Edit client
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>View client invoices</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
