"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { Account } from "./Account";
import { DesktopMenu } from "./DesktopMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavbarAuthButtons } from "./SignUpButton";
import Switcher from "@/components/switcher/Switcher";

export const Navbar = () => {
  const { isAuthenticated, token } = useAuth();

  return (
    <header className="h-18 lg:h-19 flex items-center bg-[#141414]/95 text-white sticky top-0 left-0 right-0 border-b border-neutral-800/80 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Text-based Logo */}
          <div>
            <Link href="/" className="inline-flex items-center outline-none">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div>
            <DesktopMenu />
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Switcher />
            {isAuthenticated && token ? (
              <Account />
            ) : (
              <div className="hidden sm:block">
                <NavbarAuthButtons />
              </div>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
