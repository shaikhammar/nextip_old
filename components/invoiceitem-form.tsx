import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import React from "react";
import { Textarea } from "./ui/textarea";

export default function InvoiceItemForm({
  fields,
  control,
}: {
  fields: any;
  control: any;
}): React.ReactElement {
  return fields.map((field: any, index: number) => (
    <div key={field.id} className="flex flex-row">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
  ));
}
