"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  File,
  Calendar,
  CircleUser,
  CreditCard,
  Menu,
  Package2,
  Search,
  SendHorizontal,
  Settings,
  Smile,
  User,
  Users,
  Files,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { logout } from "@/actions/auth.actions";
import { Company } from "@/actions/company.actions";
import CompaniesSelector from "./companies-selector";

export default function MenuNavbar({ companies }: { companies: Company[] }) {
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <SendHorizontal className="h-6 w-6" />
            <span className="sr-only">NextIP</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            NextIP
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink active>
                  <NavigationMenuTrigger>Clients</NavigationMenuTrigger>
                </NavigationMenuLink>
                <NavigationMenuContent className="grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-rows-2 lg:w-[200px] ">
                  <NavigationMenuLink
                    className="flex h-full w-full select-none flex-row justify-start rounded-md p-1 no-underline outline-none hover:shadow-md"
                    href="/client/create"
                  >
                    Create Client
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="flex h-full w-full select-none flex-row justify-start rounded-md p-1 no-underline outline-none hover:shadow-md"
                    href="/client"
                  >
                    View Clients
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Invoices</NavigationMenuTrigger>
                <NavigationMenuContent className="grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-rows-2 lg:w-[200px] ">
                  <NavigationMenuLink
                    className="flex h-full w-full select-none flex-row justify-start rounded-md p-1 no-underline outline-none hover:shadow-md"
                    href="/dashboard"
                  >
                    Create Invoice
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="flex h-full w-full select-none flex-row justify-start rounded-md p-1 no-underline outline-none hover:shadow-md"
                    href="/dashboard"
                  >
                    View Invoices
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <SendHorizontal className="h-6 w-6" />
                <span className="sr-only">NextIP</span>
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">
                NextIP
              </Link>
              <Command className="overflow-visible w-full">
                <CommandList className="overflow-visible w-full">
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Clients">
                    <CommandItem className="flex gap-2 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <a href="/clients/create">Create Client</a>
                    </CommandItem>
                    <CommandItem>
                      <Users className="mr-2 h-4 w-4" />
                      <a href="/clients">View Clients</a>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Invoice">
                    <CommandItem>
                      <File className="mr-2 h-4 w-4" />
                      <a href="/dashboard">Create Invoice</a>
                    </CommandItem>
                    <CommandItem>
                      <Files className="mr-2 h-4 w-4" />
                      <a href="/dashboard">View Invoices</a>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <CompaniesSelector companies={companies} />
        </div>
          {/* <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <form action={logout}>
                <DropdownMenuItem>
                  <button>Logout</button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
