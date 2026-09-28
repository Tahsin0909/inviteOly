import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDefaultMetadata } from "@/utils/seo";
import type { Metadata } from "next";
import { Logo } from "@/components/navbar/components/Logo";
import Switcher from "@/components/switcher/Switcher";

export const metadata: Metadata = getDefaultMetadata();

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen w-full bg-background text-foreground grid grid-cols-1 lg:grid-cols-2 transition-colors duration-200">
            {/* Left Column: Top Navigation + Forms / Auth content */}
            <div className="flex min-h-screen w-full flex-col justify-between px-4 py-6 sm:px-6 md:px-8 lg:px-12">
                {/* Top Bar with Logo and Theme Switcher */}
                <header className="w-full flex items-center justify-between">
                    <Link href="/" className="inline-flex items-center outline-none group">
                        <Logo textClassName="text-foreground" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Switcher />
                    </div>
                </header>

                {/* Center Auth Form */}
                <div className="w-full max-w-lg mx-auto my-auto flex flex-col justify-center py-6">
                    {children}
                </div>

                {/* Footer Subtle Note */}
                <footer className="w-full text-center py-2 text-[11px] text-muted-foreground/60 font-work-sans">
                    © {new Date().getFullYear()} InviteOly. All rights reserved.
                </footer>
            </div>

            {/* Right Column: Visual Showcase Image */}
            <div className="hidden lg:block lg:sticky lg:top-0 h-screen p-3 lg:p-4">
                <div className="relative h-full w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-border/40 shadow-xl bg-card">
                    <Image
                        src="/authSideImage.png"
                        alt="Luxury event entrance"
                        fill
                        priority
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-center select-none"
                    />
                </div>
            </div>
        </div>
    );
}

