import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export interface NavbarAuthButtonsProps {
  className?: string;
  onItemClick?: () => void;
}

export const NavbarAuthButtons: React.FC<NavbarAuthButtonsProps> = ({
  className,
  onItemClick,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <Link href="/login" onClick={onItemClick}>
        <Button
          type="button"
          variant="dark"
          shape="pill"
          className="bg-neutral-800/90 hover:bg-neutral-700 text-white font-medium px-5 py-2 text-sm h-9 cursor-pointer transition-colors shadow-xs"
        >
          Sign in
        </Button>
      </Link>
      <Link href="/register" onClick={onItemClick}>
        <Button
          type="button"
          variant="default"
          shape="pill"
          className="bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2 text-sm h-9 cursor-pointer transition-all shadow-xs"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
};

// Backwards compatibility export
export const SignUpButton = NavbarAuthButtons;

export default NavbarAuthButtons;
