"use client";

import CrownIcon from "@/assets/navbar/crown.svg";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Image from "next/image";
import { useNavbarMenu } from "../hooks/use-navbar-menu";
import { Logo } from "./Logo";
import { NavbarAuthButtons } from "./SignUpButton";

export const MobileMenu = () => {
  const { profile, isLoading, isAuthenticated, token, handleLogout } =
    useAuth();
  const { mobileMenu } = useNavbarMenu();
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const onLogout = () => {
    handleLogout();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden p-0 h-9 w-9 text-white hover:text-white hover:bg-neutral-800"
        >
          <Menu className="!h-6 !w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-neutral-900 border-neutral-800 text-white">
        <SheetHeader>
          <SheetTitle>
            <div>
              <Link href="/" onClick={handleLinkClick}>
                <Logo />
              </Link>
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col mt-8 h-[380px] overflow-y-auto">
          {mobileMenu.map((item) => (
            <div key={item?.label}>
              {item?.children ? (
                <Collapsible
                  open={openItems.includes(item.label)}
                  onOpenChange={() => toggleItem(item.label)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full text-base justify-between h-auto !px-4 py-3 font-medium text-left text-neutral-200 hover:text-white hover:bg-neutral-800"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${openItems.includes(item.label) ? "rotate-180" : ""
                          }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.children.map((child) =>
                      child.isButton ? (
                        <button
                          key={child.label}
                          onClick={onLogout}
                          className="block w-full text-left py-2 px-7 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                        >
                          {child.label}
                        </button>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.href || "/"}
                          onClick={handleLinkClick}
                          className="block py-2 px-7 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  href={item?.href || "/"}
                  onClick={handleLinkClick}
                  className="block py-3 px-4 font-medium text-neutral-200 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                >
                  {item?.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <SheetDescription className="sr-only">
          {process.env.NEXT_PUBLIC_APP_NAME} Mobile Menu
        </SheetDescription>
        <SheetFooter className="mt-4 pt-4 border-t border-neutral-800">
          {!isLoading && isAuthenticated && token ? (
            <div className="flex items-center gap-2 font-medium">
              <Avatar className="text-secondary w-[40px] h-[40px]">
                <AvatarFallback className="bg-primary text-inherit">
                  {profile?.firstName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>
                  {profile?.firstName} {profile?.lastName}
                </span>
                {profile?.hasActiveSubscription ? (
                  <Badge
                    variant="outline"
                    className="border-primary text-[10px] text-primary bg-primary/10 py-1 px-1 sm:px-2.5 leading-[1em]"
                  >
                    <Image
                      src={CrownIcon}
                      width={11}
                      height={11}
                      alt="Crown Icon"
                      className="md:w-[11px] w-[11px] md:h-[11px] object-contain"
                    />
                    Premium
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-primary text-primary bg-primary/10 py-1 px-2.5 leading-[1em]"
                  >
                    Free
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2">
              <NavbarAuthButtons onItemClick={handleLinkClick} className="w-full justify-center" />
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
