import { Company } from "@/actions/company.actions";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

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

export default function CompaniesSelector({
  companies,
}: {
  companies: Company[];
}) {
  return (
    <>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {companies.map((company) => (
            <CommandItem key={company.id}>{company.name}</CommandItem>
          ))}
        </CommandList>
      </Command>
    </>
  );
}
