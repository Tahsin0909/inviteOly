import Link from "next/link";
import { Logo } from "@/components/navbar/components/Logo";

export const Brand = () => {
  return (
    <div className="flex flex-col items-start">
      <Link href="/" className="inline-flex items-center outline-none">
        <Logo size="md" />
      </Link>
      <p className="mt-4 text-neutral-400 text-sm leading-relaxed max-w-[280px]">
        The modern event management platform for hosts who care about every detail.
      </p>
    </div>
  );
};

export default Brand;
