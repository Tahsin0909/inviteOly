"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useNavbarMenu } from "../hooks/use-navbar-menu";

export const DesktopMenu = () => {
  const { desktopMenu } = useNavbarMenu();

  return (
    <nav aria-label="Main Navigation" className="xl:flex hidden items-center gap-7 lg:gap-8">
      {desktopMenu.map((item) =>
        item.children ? (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger className="flex items-center text-sm md:text-base text-neutral-300 hover:text-white font-work-sans font-medium transition-colors duration-200 gap-1.5 outline-none cursor-pointer">
              <span>{item.label}</span>
              <ChevronDown className="w-3.5 h-3.5 object-contain opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white shadow-xl">
              {item.children.map((child) => (
                <DropdownMenuItem
                  key={child.label}
                  className="font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 cursor-pointer"
                  asChild
                >
                  <Link href={`${child.href}`}>{child.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={item.label}
            href={item.href!}
            className="text-sm md:text-base text-neutral-300 hover:text-white font-work-sans font-medium transition-colors duration-200"
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
};
