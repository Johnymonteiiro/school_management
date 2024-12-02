import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface Values {
    value: string;
}

interface SelectProps {
  placeholder: string;
  items: Values[];
  onValueChange?:(value: string) => void
}
export function SelectOptions({ items, placeholder, onValueChange }: SelectProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, index) => (
            <SelectItem key={index} value={item.value.toLowerCase()}>
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
