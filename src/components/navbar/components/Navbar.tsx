"use client";

import Switcher from "@/components/switcher/Switcher";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { Account } from "./Account";
import { DesktopMenu } from "./DesktopMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SignUpButton } from "./SignUpButton";

export const Navbar = () => {
  const { isAuthenticated, token } = useAuth();

  return (
    <header className="lg:py-5 py-4 bg-background dark:bg-surface-deep sticky top-0 left-0 right-0 border-b border-b-border z-50">
      <div className="container">
        <div className="flex items-center justify-between gap-2">
          <div>
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div>
            <DesktopMenu />
          </div>
          <div className="flex items-center sm:gap-[18px] gap-3">
            <Switcher />
            <MobileMenu />
            <div className="xl:block hidden">
              {isAuthenticated && token ? <Account /> : <div className="flex justify-center items-center gap-2">
                <SignUpButton />
              </div>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
