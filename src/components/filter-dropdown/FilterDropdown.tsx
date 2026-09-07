"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface FilterDropdownProps {
  category: string;
  setCategory: (value: string) => void;
  options: Category[];
}

export const FilterDropdown = ({
  category,
  setCategory,
  options,
}: FilterDropdownProps) => {
  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="!h-auto py-4">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option?.id} value={option?.id}>
            {option?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
