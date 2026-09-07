"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  term: string;
  setTerm: (e: string) => void;
}

export const SearchBar = ({ term, setTerm }: SearchBarProps) => {
  const [value, setValue] = useState(term);

  useEffect(() => {
    const handler = setTimeout(() => {
      setTerm(value);
    }, 500);

    return () => clearTimeout(handler);
  }, [value, setTerm]);

  return (
    <div className="flex w-full">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 w-[15px] h-[15px] object-contain left-[15px]" />
        <Input
          type="text"
          placeholder="Search here"
          className="h-full md:px-10 ps-10 pe-2 py-4 font-medium rounded-tr-none rounded-br-none md:text-base text-sm"
          name="newsletterSearch"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
