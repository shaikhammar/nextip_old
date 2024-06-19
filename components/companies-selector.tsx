"use client";
import {useEffect, useState} from "react";
import { useLocalStorage } from "usehooks-ts";
import { Company } from "@/actions/company.actions";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
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


export default function CompaniesSelector({
  companies,
}: {
  companies: Company[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedCompany, setSelectedCompany] = useLocalStorage(
    "selectedCompany",
    ""
  );

  useEffect(() => {
    if (selectedCompany) {
      setValue(selectedCompany);
    }
  }, [selectedCompany]);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? companies.find(
                (company) => company.companyId.toString() === value
              )?.name
            : "Select company..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search companies..." />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.companyId}
                  value={company.companyId.toString()}
                  onSelect={(currentValue) => {
                    handleSelectCompany(currentValue);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === company.companyId.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {company.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
