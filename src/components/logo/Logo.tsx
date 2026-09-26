import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  showText = true,
  textClassName,
}) => {
  const sizeClasses = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-[26px]",
    lg: "text-3xl sm:text-4xl",
  };

  const imageSizes = {
    sm: { width: 32, height: 32, className: "size-7 sm:size-8" },
    md: { width: 40, height: 40, className: "size-9 sm:size-10" },
    lg: { width: 48, height: 48, className: "size-11 sm:size-12" },
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <Image
        src="/InviteOlylogo.png"
        alt="InviteOly Logo"
        width={imageSizes[size].width}
        height={imageSizes[size].height}
        className={cn("object-contain shrink-0", imageSizes[size].className)}
        priority
      />
      {showText && (
        <span
          className={cn(
            "font-space-grotesk font-bold tracking-tight text-white leading-none",
            sizeClasses[size],
            textClassName
          )}
        >
          Invite<span className="text-primary">O</span>ly
        </span>
      )}
    </div>
  );
};

export default Logo;
