"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { Account } from "./Account";
import { DesktopMenu } from "./DesktopMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavbarAuthButtons } from "./SignUpButton";

export const Navbar = () => {
  const { isAuthenticated, token } = useAuth();

  return (
    <header className="lg:py-9 py-5 bg-[#141414] text-white sticky top-0 left-0 right-0 border-b border-neutral-800/80 z-50 backdrop-blur-md">
      <div className="container mx-auto">
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
          <div className="flex items-center sm:gap-4 gap-3">
            <div className="xl:block hidden">
              {isAuthenticated && token ? (
                <Account />
              ) : (
                <NavbarAuthButtons />
              )}
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
