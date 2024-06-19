"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { CurrencyMutator, currencyFormSchema } from "@/lib/types/currency";
import { setCurrency } from "@/actions/currency.actions";
import { toast } from "./ui/use-toast";

export default function CurrencyForm({
  onCurrencyFormSubmit,
  currency,
}: {
  onCurrencyFormSubmit: any;
  currency?: CurrencyMutator | null;
}) {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof currencyFormSchema>>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues: currency
      ? {
          code: "",
          name: "",
        }
      : undefined,
  });
  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof currencyFormSchema>,
    event: any
  ) {
    event.preventDefault();
    event.stopPropagation();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const response = await setCurrency(values);
    if (response?.error && response?.error !== "") {
      toast({
        variant: "destructive",
        description: response.error,
      });
      return;
    }
    onCurrencyFormSubmit();
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
              <div className="col-span-2 ml-1 py-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
