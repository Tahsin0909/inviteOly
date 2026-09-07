import Image from "next/image";
import Link from "next/link";

export const Subscribe = () => {
  return (
    <Link
      href="/login"
      className="flex items-center justify-center md:text-base text-sm text-surface-dark dark:text-primary hover:text-primary font-work-sans font-medium transition-colors duration-300 md:gap-2 gap-1 outline-none border-2 border-primary rounded-md md:px-4 px-2 md:py-2 py-1.5"
    >
      <Image
        src="/plane.svg"
        width={18}
        height={18}
        alt="Plane Icon"
        className="md:w-[18px] w-[14px] md:h-[18px] object-contain"
      />
      <span>Subscribe</span>
    </Link>
    // <DropdownMenu>
    //   <DropdownMenuTrigger className="flex items-center justify-center md:text-lg text-sm text-surface-dark dark:text-primary hover:text-primary font-work-sans font-medium transition-colors duration-300 md:gap-2 gap-1 outline-none border-2 border-primary rounded-xl md:px-4 px-2 md:py-2 py-1.5">
    //     <Image
    //       src="/plane.svg"
    //       width={18}
    //       height={18}
    //       alt="Plane Icon"
    //       className="md:w-[18px] w-[14px] md:h-[18px] object-contain"
    //     />
    //     <span>Subscribe</span>
    //     <ChevronDown className="md:w-[20px] w-[16px] object-contain" />
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="md:w-[178px] w-[126px]">
    //     <DropdownMenuItem className="font-medium" asChild>
    //       <Link href={`/`}>Premium</Link>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};
