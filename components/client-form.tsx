"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { clientFormSchema } from "@/lib/form-types";
import { useEffect, useState } from "react";
import { setClient } from "@/actions/client.actions";
import { Currency, currency } from "@/lib/types/currency";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import {
  Client,
  ClientInitializer,
  ClientMutator,
  clientInitializer,
} from "@/lib/types/client";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
// import AdhocCurrencyForm from "./adhoc-currency-form";

export default function ClientForm({
  currencies,
  client,
  clientId,
}: {
  currencies: Currency[];
  client?: ClientMutator | null;
  clientId?: number | null;
}) {
  const router = useRouter();
  //State for Add currency Modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  //State for popover
  const [open, setOpen] = useState(false);

  let clientValues: Client;

  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: client
      ? {
          name: client.name ? client.name : "",
          code: client.code ? client.code : "",
          address: client.address ? client.address : "",
          email: client.email ? client.email : "",
          currency: client.currency?.code,
        }
      : undefined,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log("HERE");
    // console.log(values);
    const response = await setClient(values, clientId);
    if (response?.error && response?.error !== "") {
      toast({
        variant: "destructive",
        className: "top-right",
        description: response.error,
      });
    }
    if (response?.success) {
      toast({
        variant: "default",
        title: response.success,
      });

      router.push("/client");
    }
  }

  const onError = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <Card className="lg:w-[750px] md:w-[400px]">
        <CardHeader>
          <CardTitle>Create Client</CardTitle>
          <CardDescription>
            Enter details below to create new client.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-8"
            >
              <div className="grid grid-cols-3">
                <div className="col-span-2 mr-1 py-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1 ml-1 py-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-3 py-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 py-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 py-2">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Currency</FormLabel>
                          <div className="flex items-center space-x-2">
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[250px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? currencies.find(
                                          (currency) =>
                                            currency.code === field.value
                                        )?.name
                                      : "Select currency"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search currency..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No currency found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {currencies.map((currency) => (
                                        <CommandItem
                                          value={currency.code}
                                          key={currency.code}
                                          onSelect={() => {
                                            form.setValue(
                                              "currency",
                                              currency.code
                                            );
                                            console.log(form);
                                            setOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              currency.code === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {currency.code}-{currency.name}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            {/* <Button
                            variant="outline"
                            onClick={handleDialogOpen}
                            type="button"
                            >
                            Add Currency
                            </Button> */}
                          </div>

                          <FormDescription>
                            This is the default currency that will be used by
                            this client.
                            <br />
                            If a client uses multiple currencies, clone the
                            client with a different currency.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <Button type="submit">Submit</Button>
              <Link href="/client">
                <Button type="button" className="ml-3" variant={"outline"}>
                  Cancel
                </Button>
              </Link>
            </form>
          </Form>
          {/* <AdhocCurrencyForm open={isDialogOpen} onClose={handleDialogClose} /> */}
        </CardContent>
      </Card>
    </>
  );
}
