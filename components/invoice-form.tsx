"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
// import { setInvoice } from "@/actions/invoice.actions";
import { Currency } from "@/lib/types/currency";
import { Invoice, InvoiceStatus } from "@/lib/types/invoice";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import AdhocCurrencyForm from "./adhoc-currency-form";
import { trpc } from "@/app/_trpc/client";
import { useReadLocalStorage } from "usehooks-ts";

import { Client } from "@/lib/types/client";
import ClientCombobox from "./client-combobox";
import { Calendar } from "./ui/calendar";
import InvoiceItemForm from "./invoiceitem-form";

export const invoiceItemFormSchema = z.object({
  itemOrder: z.coerce.number({
    invalid_type_error: "Item order must be a number",
    required_error: "Item order is required",
  }),
  itemDescription: z.string().optional(),
  itemQuantity: z
    .instanceof(Prisma.Decimal)
    .refine(
      (itemQuantity) =>
        itemQuantity.gte("0.01") && itemQuantity.lt("1000000.00"),
      {
        message: "Quantity must be between 0.01 and 1000000.00",
      }
    ),
  itemUnitCost: z
    .instanceof(Prisma.Decimal)
    .refine(
      (itemUnitCost) =>
        itemUnitCost.gte("0.01") && itemUnitCost.lt("1000000.00"),
      {
        message: "Unit cost must be between 0.01 and 1000000.00",
      }
    ),
  itemTotal: z
    .instanceof(Prisma.Decimal)
    .refine(
      (itemTotal) => itemTotal.gte("0.01") && itemTotal.lt("1000000.00"),
      {
        message: "Total must be between 0.01 and 1000000.00",
      }
    ),
});

export const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Invoice number is required." }),
  clientId: z.coerce.number({ message: "Client is required." }),
  invoiceDate: z.date({ message: "Invoice date is required." }),
  poNumber: z.string().optional(),
  notes: z.string().optional(),
  exchangeRate: z.object({
    rate: z
      .instanceof(Prisma.Decimal)
      .refine((rate) => rate.gte("0.01") && rate.lt("1000000.00")),
    currencyId: z.string().min(1, { message: "Currency is required." }),
  }),
  invoiceTotal: z
    .instanceof(Prisma.Decimal)
    .refine(
      (invoiceTotal) =>
        invoiceTotal.gte("0.01") && invoiceTotal.lt("1000000.00")
    ),
  baseCurrencyInvoiceTotal: z
    .instanceof(Prisma.Decimal)
    .refine(
      (baseCurrencyInvoiceTotal) =>
        baseCurrencyInvoiceTotal.gte("0.01") &&
        baseCurrencyInvoiceTotal.lt("1000000.00")
    ),
  invoiceItem: z
    .array(invoiceItemFormSchema)
    .nonempty({ message: "At least one invoice item is required" }),
});

export default function InvoiceForm({
  formOpen,
  onFormClose,
  invoice,
  invoiceId,
}: {
  formOpen?: any;
  onFormClose?: any;
  invoice?: Invoice;
  invoiceId?: number;
}) {
  const companyId = useReadLocalStorage("companyId");

  // console.log(clients);
  const getCurrencies = trpc.getCurrencies.useQuery();
  const currencies: Currency[] = getCurrencies.data!;

  const router = useRouter();
  //State for Add currency Modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  //State for popover
  const [open, setOpen] = useState(false);

  // let clientValues: Client;

  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: "",
      clientId: 0,
      invoiceDate: "",
      poNumber: "",
      notes: "",
      exchangeRate: {
        rate: new Prisma.Decimal(0.0),
        currencyId: "",
      },
      invoiceTotal: new Prisma.Decimal(0.0),
      baseCurrencyInvoiceTotal: new Prisma.Decimal(0.0),
      invoiceItem: [
        {
          itemOrder: 1,
          itemDescription: "",
          itemQuantity: new Prisma.Decimal(0.0),
          itemUnitCost: new Prisma.Decimal(0.0),
          itemTotal: new Prisma.Decimal(0.0),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invoiceItem",
    
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log("HERE");
    console.log(values);
    // const response = await setClient(values, clientId);
    // if (response?.error && response?.error !== "") {
    //   toast({
    //     variant: "destructive",
    //     className: "top-right",
    //     description: response.error,
    //   });
    // }
    // if (response?.success) {
    //   toast({
    //     variant: "default",
    //     title: response.success,
    //   });
    //   onFormClose();
    //   router.push("/client");
    // }
  }

  const onError = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <Card className="lg:w-[1300px] md:w-[400px] border-none shadow-none">
        <CardHeader>
          <CardTitle>New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onError={onError}
              className="space-y-6"
            >
              <div className="grid grid-cols-3">
                <div className="col-span-1 mr-1 py-2">
                  <Card className="w-[1/3]">
                    <CardContent className="py-6">
                      <FormField
                        control={form.control}
                        name="clientId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Client</FormLabel>
                            <ClientCombobox form={form} field={field} />
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-1 mx-2 py-2">
                  <Card className="w-[1/3]">
                    <CardContent className="py-6">
                      <FormField
                        control={form.control}
                        name="invoiceDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col py-2">
                            <FormLabel>Invoice Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "P")
                                    ) : (
                                      <span>MM/DD/YYYY</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  captionLayout="buttons"
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date: Date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                                <div className="flex justify-evenly">
                                  <Button
                                    variant="ghost"
                                    onClick={() =>
                                      form.resetField("invoiceDate")
                                    }
                                  >
                                    Clear
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      form.setValue("invoiceDate", new Date());
                                    }}
                                  >
                                    Today
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Due Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "P")
                                    ) : (
                                      <span>MM/DD/YYYY</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  captionLayout="buttons"
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date: Date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                                <div className="flex justify-evenly">
                                  <Button
                                    variant="ghost"
                                    onClick={() =>
                                      form.resetField("invoiceDate")
                                    }
                                  >
                                    Clear
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      form.setValue("notes", "new Date()");
                                    }}
                                  >
                                    Today
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-1 ml-1 py-2">
                  <Card className="w-[1/3]">
                    <CardContent className="py-6">
                      <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Invoice Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="poNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PO Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="col-span-3">
                TEST
                {/* <InvoiceItemForm fields={fields} control={form.control} /> */}
                {/* {fields.map((_: any, index: number) => {
                  return (
                    <div key={index} className="flex flex-row">
                      <FormField
                        control={form.control}
                        key={index}
                        name={`invoiceItem.${index}.itemOrder`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        key={index + 1}
                        control={form.control}
                        name={`invoiceItem.${index}.itemDescription`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        key={index + 2}
                        control={form.control}
                        name={`invoiceItem.${index}.itemQuantity.d.${index}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })} */}
                {/* {fields.map(
                  (field: any, index: number) => (
                    console.log("index")
                    // (
                    //   <FormField
                    //     key={field.id}
                    //     name={`invoiceItem.${index}.itemDescription`}
                    //     render={({ field }) => (
                    //       <FormItem>
                    //         <FormControl>
                    //           <Textarea {...field} />
                    //         </FormControl>
                    //         <FormMessage />
                    //       </FormItem>
                    //     )}
                    //   />
                    // )
                  )
                )} */}
              </div>
              {/* <InvoiceItemForm fields={fields} control={form.control} /> */}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

// <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit, onError)}
//               className="space-y-8"
//             >
//               <div className="grid grid-cols-3">
//                 <div className="col-span-2 mr-1 py-2">
//                   <FormField
//                     control={form.control}
//                     name="invoiceNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Invoice Number</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="col-span-1 ml-1 py-2">
//                   <FormField
//                     control={form.control}
//                     name="code"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Code</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="col-span-3 py-2">
//                   <FormField
//                     control={form.control}
//                     name="address"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Address</FormLabel>
//                         <FormControl>
//                           <Textarea {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className="col-span-2 py-2">
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div className="col-span-2 py-2">
//                     <FormField
//                       control={form.control}
//                       name="currency"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-col">
//                           <FormLabel>Currency</FormLabel>
//                           <div className="flex items-center space-x-2">
//                             <Popover open={open} onOpenChange={setOpen}>
//                               <PopoverTrigger asChild>
//                                 <FormControl>
//                                   <Button
//                                     variant="outline"
//                                     role="combobox"
//                                     className={cn(
//                                       "w-[250px] justify-between",
//                                       !field.value && "text-muted-foreground"
//                                     )}
//                                   >
//                                     {field.value
//                                       ? currencies?.find(
//                                           (currency) =>
//                                             currency.code === field.value
//                                         )?.name
//                                       : "Select currency"}
//                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                   </Button>
//                                 </FormControl>
//                               </PopoverTrigger>
//                               <PopoverContent className="w-[300px] p-0">
//                                 <Command>
//                                   <CommandInput placeholder="Search currency..." />
//                                   <CommandList>
//                                     <CommandEmpty>
//                                       No currency found.
//                                     </CommandEmpty>
//                                     <CommandGroup
//                                       className="text-center"
//                                       heading={
//                                         <Button
//                                           variant="ghost"
//                                           onClick={handleDialogOpen}
//                                           type="button"
//                                         >
//                                           Add Currency
//                                         </Button>
//                                       }
//                                     >
//                                       <CommandItem className="flex justify-center">
//                                         {/* <Button
//                                           variant="ghost"
//                                           onClick={handleDialogOpen}
//                                           type="button"
//                                         >
//                                           Add Currency
//                                         </Button> */}
//                                       </CommandItem>
//                                       {currencies?.map((currency) => (
//                                         <CommandItem
//                                           value={currency.code}
//                                           key={currency.code}
//                                           onSelect={() => {
//                                             form.setValue(
//                                               "currency",
//                                               currency.code
//                                             );
//                                             console.log(form);
//                                             setOpen(false);
//                                           }}
//                                         >
//                                           <Check
//                                             className={cn(
//                                               "mr-2 h-4 w-4",
//                                               currency.code === field.value
//                                                 ? "opacity-100"
//                                                 : "opacity-0"
//                                             )}
//                                           />
//                                           {currency.code}-{currency.name}
//                                         </CommandItem>
//                                       ))}
//                                     </CommandGroup>
//                                   </CommandList>
//                                 </Command>
//                               </PopoverContent>
//                             </Popover>
//                             {/* <Button
//                             variant="outline"
//                             onClick={handleDialogOpen}
//                             type="button"
//                             >
//                             Add Currency
//                             </Button> */}
//                           </div>

//                           <FormDescription>
//                             This is the default currency that will be used by
//                             this client.
//                             <br />
//                             If a client uses multiple currencies, clone the
//                             client with a different currency.
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <Button type="submit">Submit</Button>
//               <Link href="/client">
//                 <Button
//                   type="button"
//                   className="ml-3"
//                   variant={"outline"}
//                   onClick={onFormClose}
//                 >
//                   Cancel
//                 </Button>
//               </Link>
//             </form>
//           </Form>
//           <AdhocCurrencyForm open={isDialogOpen} onClose={handleDialogClose} />
