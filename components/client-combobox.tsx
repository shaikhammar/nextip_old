import { useRef, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Client } from "@/lib/types/client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { FormControl } from "@/components/ui/form";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { set } from "zod";
import { Label } from "./ui/label";

export default function ClientCombobox({
  form,
  field,
}: {
  form: any;
  field: any;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const clientAddress = useRef<HTMLTextAreaElement | null>(null);
  let clientAddressClassName = "w-[400px] hidden";
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const getClients = trpc.getClients.useQuery();
  const clients: Client[] = getClients?.data!;

  return (
    <>
      <div className="flex items-center space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[400px] justify-between",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? clients?.find((client) => client.clientId === field.value)
                      ?.name
                  : "Select client"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search currency..." />
              <CommandList>
                <CommandEmpty>No currency found.</CommandEmpty>
                <CommandGroup
                  className="text-center"
                  heading={
                    <Link href="/client/create">
                      <Button variant="ghost">Add Client</Button>
                    </Link>
                  }
                >
                  <CommandItem className="flex justify-center">
                    {/* <Button
                                          variant="ghost"
                                          onClick={handleDialogOpen}
                                          type="button"
                                        >
                                          Add Currency
                                        </Button> */}
                  </CommandItem>
                  {clients?.map((client) => (
                    <CommandItem
                      value={client.clientId}
                      key={client.clientId}
                      onSelect={() => {
                        form.setValue("clientId", client.clientId);
                        clientAddress.current!.value = client.address!;
                        clientAddressClassName = "w-[400px]";
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          client.clientId === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {client.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="pt-4">
        <Label
          className={
            clientAddress.current?.value !== ""
              ? "flex flex-col pb-2"
              : "flex flex-col pb-2 hidden"
          }
        >
          Address
        </Label>
        <Textarea
          className={
            clientAddress.current?.value !== ""
              ? "flex flex-col pb-2"
              : "flex flex-col pb-2 hidden"
          }
          disabled
          ref={clientAddress}
        />
      </div>
    </>
  );
}
