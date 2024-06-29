"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { ExchangeRate } from "@/lib/types/currency";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "./ui/use-toast";
import { setExchangeRate } from "@/actions/currency.actions";
import CurrencyForm, { currencyFormSchema } from "./currency-form";

export const exchangeRateFormSchema = z.object({
  rate: z
    .instanceof(Prisma.Decimal)
    .refine((rate) => rate.gte("0.01") && rate.lt("1000000.00")),
  currency: z.object({
    code: z.string().min(3, { message: "Please select a currency." }),
  }),
});

export default function ExchangeRateForm({
  onExhcangeRateFormSubmit,
  exchangeRate,
}: {
  onExhcangeRateFormSubmit: any;
  exchangeRate?: ExchangeRate | null;
}) {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof exchangeRateFormSchema>>({
    resolver: zodResolver(exchangeRateFormSchema),
    defaultValues: exchangeRate
      ? {
          rate: exchangeRate.rate.toNumber()
            ? exchangeRate.rate.toNumber()
            : new Prisma.Decimal(1).toNumber(),
          currency: {
            code: exchangeRate.currency?.code
              ? exchangeRate.currency?.code
              : "",
          } as z.infer<typeof currencyFormSchema>,
        }
      : undefined,
  });
  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof exchangeRateFormSchema>,
    event: any
  ) {
    event.preventDefault();
    event.stopPropagation();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const response = await setExchangeRate(values);
    if (response?.error && response?.error !== "") {
      toast({
        variant: "destructive",
        description: response.error,
      });
      return;
    }
    onExhcangeRateFormSubmit();
    toast({
      variant: "default",
      description: "Currency added successfully",
    });
  }

  return (
    <>
      <div className="mx-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-3">
              <div className="col-span-1 mr-1 py-2">
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 ml-1 py-2">
                <FormField
                  control={form.control}
                  name="currency.code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
