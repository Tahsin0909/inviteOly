import { Crown } from "lucide-react";
import Link from "next/link";

export const UpGradePlan = () => {
    return (
        <Link
            href="/pricing"
            className="flex items-center justify-center md:text-base text-sm text-surface-dark dark:text-primary hover:text-primary font-work-sans font-medium transition-colors duration-300 md:gap-2 gap-1 outline-none border-2 border-primary rounded-md md:px-4 px-2 md:py-2 py-1.5"
        >
            <Crown />
            <span>Upgrade</span>
        </Link>
    );
};
