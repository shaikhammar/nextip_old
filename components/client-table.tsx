"use client";

import { Client } from "@/lib/types/client";
import { ColumnDef } from "@tanstack/react-table";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "code",
    // enableColumnFilter: true,
    enableGlobalFilter: true,
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Code
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarFallback className="text-xs">
              {row.getValue("code")}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    // enableColumnFilter: true,
    enableGlobalFilter: true,
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    // accessorKey: "currency.code",
    id: "balance",
    accessorFn: (client) => {
      const balanceNumber = parseFloat(client.balance.toString());
      const formattedBalance = balanceNumber.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return `${client.currency.code} ${formattedBalance}`;
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
              <DropdownMenuItem className="cursor-pointer">Edit client</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>View client invoices</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
