import React from "react";
import Image from "next/image";
import { getDefaultMetadata } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = getDefaultMetadata();

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen w-full bg-background grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column: Children (Forms / Auth content) */}
            <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:px-12">
                <div className="w-full max-w-lg flex flex-col justify-center">
                    {children}
                </div>
            </div>

            {/* Right Column: Visual Showcase Image */}
            <div className="hidden lg:block lg:sticky lg:top-0 h-screen p-3 lg:p-4">
                <div className="relative h-full w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-border/40 shadow-xl">
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

