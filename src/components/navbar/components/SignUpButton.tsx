import { LogIn } from "lucide-react";
import Link from "next/link";

export const SignUpButton = () => {
    return (
        <Link
            href="/register"
            className="flex items-center justify-center md:text-lg text-sm dark:text-dark text-white font-work-sans font-medium transition-colors duration-300 md:gap-2 gap-1 outline-none border-2 border-primary bg-primary rounded-xl md:px-4 px-2 md:py-2 py-1.5"
        >
            <LogIn />
            <span>Sign up</span>
        </Link>
    );
};
