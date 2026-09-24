import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Dashboard - InviteOly",
};

export default function UserDashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space-grotesk text-foreground mb-6">
          User Dashboard
        </h1>

        {/* Forced Payment Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-primary/30 shadow-sm text-center">
          <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <CreditCard className="size-7 stroke-[1.8]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-space-grotesk text-foreground mb-2">
            Subscription Required
          </h2>
          <p className="text-sm font-work-sans text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
            Your account requires an active subscription plan to access full event hosting and ticketing features. Please select a plan to activate your account.
          </p>

          <Link href="/#pricing">
            <Button
              type="button"
              className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base px-8 py-3.5 h-auto shadow-md transition-all cursor-pointer"
            >
              Choose a Pricing Plan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

