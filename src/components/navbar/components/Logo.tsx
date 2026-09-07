import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div>
      <Image
        src="/logo-white.svg"
        width={180}
        height={40}
        className={cn(
          "xl:w-[180px] xs:w-[140px] w-[120px] h-auto lg:h-[50px] object-contain dark:hidden",
          className
        )}
        alt={`${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <Image
        src="/logo-dark.svg"
        width={180}
        height={40}
        className={cn(
          "xl:w-[180px] xs:w-[140px] w-[120px] h-auto lg:h-[50px] object-contain not-dark:hidden",
          className
        )}
        alt={`${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
    </div>
  );
};
