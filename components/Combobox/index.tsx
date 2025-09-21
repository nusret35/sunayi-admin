"use client";
import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

export function Combobox({
  selected,
  data,
  setValue,
  placeholder,
  searchPlaceholder,
}: {
  selected?: string;
  data: string[];
  setValue: (newValue?: string) => void;
  placeholder: string;
  searchPlaceholder: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="dark:bg-btndark w-full cursor-pointer justify-between bg-white dark:border-none"
        >
          {selected ? data.find((entry) => entry === selected) : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="dark:bg-btndark flex bg-white p-0 dark:border-none"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="dark:bg-btndark w-full bg-white">
          <CommandInput className="" placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((entry) => (
                <CommandItem
                  key={entry}
                  className="dark:bg-btndark cursor-pointer bg-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  value={entry}
                  onSelect={() => {
                    setValue(entry === selected ? undefined : entry);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === entry ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {entry}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
