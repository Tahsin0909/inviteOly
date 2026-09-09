"use client";

import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UnderConstructionProps {
  title: string;
  role?: string;
  description?: string;
}

export function UnderConstruction({
  title,
  role,
  description,
}: UnderConstructionProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs flex flex-col items-center">
        {/* Construction Icon */}
        <div className="size-16 rounded-2xl bg-[#FAF5EB] border border-primary/20 flex items-center justify-center text-primary mb-5 shadow-xs">
          <Construction className="size-8 stroke-[1.8]" />
        </div>

        {/* Role & Title */}
        {role && (
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary bg-[#FAF5EB] px-3 py-1 rounded-full border border-primary/20 mb-3">
            {role} Module
          </span>
        )}

        <h2 className="text-2xl font-bold font-space-grotesk text-foreground mb-2">
          {title}
        </h2>

        <p className="text-sm font-work-sans text-muted-foreground leading-relaxed mb-6">
          {description ||
            "This module is currently under construction. We are building something extraordinary for you. Please check back soon!"}
        </p>

        <div className="flex items-center gap-3 w-full justify-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="rounded-full cursor-pointer text-sm font-medium border-neutral-300 hover:bg-neutral-100"
          >
            <ArrowLeft className="size-4 mr-1.5" />
            Go Back
          </Button>

          <Link href="/dashboard">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white cursor-pointer text-sm font-medium px-5">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

