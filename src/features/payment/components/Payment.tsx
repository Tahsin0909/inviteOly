"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentStep } from "@/features/event/store/createEvent.slice";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Check,
} from "lucide-react";

export const Payment: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Read saved values from Redux as fallbacks
  const packageSelection = useSelector(
    (state: RootState) => state.createEvent?.packageSelection
  );
  const eventDetails = useSelector(
    (state: RootState) => state.createEvent?.eventDetails
  );

  // Extract query parameters with fallbacks
  const rawAmount =
    searchParams.get("amount") ||
    packageSelection?.price?.replace(/[^0-9]/g, "") ||
    "149";
  const amount = Number(rawAmount) || 149;
  const packageName =
    searchParams.get("packageName") ||
    packageSelection?.packageName ||
    "Standard Package (Intimate)";
  const eventName =
    searchParams.get("eventName") ||
    eventDetails?.eventName ||
    "Luxury Event Celebration";
  const returnUrl =
    searchParams.get("returnUrl") || "/host/create-event?step=5";

  // Form states
  const [paymentMethod, setPaymentMethod] = useState<"card" | "express">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock form inputs
  const [cardHolder, setCardHolder] = useState("John Doe");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("888");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Set Step 5 in Redux
      dispatch(setCurrentStep(5));

      // Auto redirect to guest list after 1.2s
      setTimeout(() => {
        router.push(returnUrl);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-work-sans py-4 pb-16">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Event Configuration</span>
        </button>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk text-neutral-900 dark:text-white tracking-tight">
            Complete Payment
          </h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF8E7] dark:bg-[#C39B4C]/15 text-[#C39B4C] border border-[#C39B4C]/30 shadow-2xs">
            <Lock className="size-3" />
            256-Bit SSL
          </span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Review your event package details and enter your payment information
          to unlock full ticketing & guest roster features.
        </p>
      </div>

      {/* Success Modal / Banner */}
      {isSuccess && (
        <div className="bg-[#EAF7EE] dark:bg-emerald-950/40 border border-[#16A34A]/30 dark:border-emerald-800/40 rounded-2xl p-6 text-center space-y-3 shadow-md animate-in fade-in duration-300">
          <div className="size-14 rounded-full bg-[#16A34A] text-white flex items-center justify-center mx-auto shadow-xs">
            <Check className="size-8 stroke-[3]" />
          </div>
          <h3 className="text-xl font-bold font-space-grotesk text-neutral-900 dark:text-white">
            Payment Successful!
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
            Your payment of{" "}
            <strong className="text-neutral-900 dark:text-white">${amount}.00</strong> has been
            confirmed. Redirecting you to your Guest List automatically...
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#16A34A] dark:text-emerald-400 pt-1">
            <span className="size-2 rounded-full bg-[#16A34A] dark:bg-emerald-400 animate-ping" />
            <span>Redirecting to Step 5 (Guest List)...</span>
          </div>
        </div>
      )}

      {/* Main Grid: Summary on Left, Payment on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Order Summary (Span 5) */}
        <div className="md:col-span-5 bg-white dark:bg-neutral-900/80 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-3.5">
            <h3 className="font-bold text-base font-space-grotesk text-neutral-900 dark:text-white">
              Order Summary
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
              Event ticketing package activation
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-[13px]">
            {/* Event Name */}
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">Event</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                {eventName}
              </span>
            </div>

            {/* Package */}
            <div>
              <span className="text-neutral-400 dark:text-neutral-500 block">Package</span>
              <span className="font-semibold text-[#C39B4C] text-sm">
                {packageName}
              </span>
            </div>

            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3 space-y-2 text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Package Base Price</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  ${amount}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Processing Fee</span>
                <span className="text-[#16A34A] dark:text-emerald-400 font-semibold">Free ($0.00)</span>
              </div>
              <div className="flex justify-between">
                <span>Applicable Taxes</span>
                <span className="text-neutral-400 dark:text-neutral-500">$0.00</span>
              </div>
            </div>

            <div className="border-t-2 border-neutral-100 dark:border-neutral-800 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900 dark:text-white">
                Total Due Today
              </span>
              <span className="text-2xl font-bold font-space-grotesk text-[#C39B4C]">
                ${amount}.00
              </span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="bg-[#FAF9F6] dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800 rounded-xl p-3 space-y-2 text-[11px] text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#16A34A] dark:text-emerald-400 shrink-0" />
              <span>Instant ticketing activation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#C39B4C] shrink-0" />
              <span>Full guest list & check-in app unlocked</span>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Form (Span 7) */}
        <div className="md:col-span-7 bg-white dark:bg-neutral-900/80 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs p-5 sm:p-7 space-y-6">
          <div>
            <h3 className="font-bold text-base font-space-grotesk text-neutral-900 dark:text-white">
              Payment Method
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
              Select your preferred payment option
            </p>
          </div>

          {/* Payment Method Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2.5 p-1 bg-neutral-100/70 dark:bg-neutral-950/70 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "card"
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
            >
              <CreditCard className="size-3.5" />
              <span>Credit / Debit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("express")}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "express"
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
            >
              <Smartphone className="size-3.5" />
              <span>Apple / Google Pay</span>
            </button>
          </div>

          {paymentMethod === "express" ? (
            /* Express Checkout Options */
            <div className="space-y-3 py-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing || isSuccess}
                className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Pay with Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing || isSuccess}
                className="w-full py-3.5 rounded-xl bg-[#0B1A30] hover:bg-[#132742] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Pay with Google Pay</span>
              </button>
            </div>
          ) : (
            /* Card Details Form */
            <form onSubmit={handlePay} className="space-y-4">
              {/* Cardholder Name */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    required
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all"
                  />
                  <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                </div>
              </div>

              {/* Expiry & CVC */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Expiration (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="12/28"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Security Code (CVC)
                  </label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="888"
                    required
                    maxLength={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/25 focus:border-[#C39B4C] transition-all"
                  />
                </div>
              </div>

              {/* Submit Pay Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing || isSuccess}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#C39B4C] hover:bg-[#b08b3e] text-white font-semibold text-sm transition-all cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" />
                      <span>Pay Now (${amount}.00)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1">
            <Sparkles className="size-3 text-[#C39B4C]" />
            <span>Encrypted transaction via InviteOly Payment Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
