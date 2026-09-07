import React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-[26px]",
    lg: "text-3xl sm:text-4xl",
  };

  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <span
        className={cn(
          "font-space-grotesk font-bold tracking-tight text-white leading-none",
          sizeClasses[size]
        )}
      >
        Invite<span className="text-primary">O</span>ly
      </span>
    </div>
  );
};

export default Logo;
