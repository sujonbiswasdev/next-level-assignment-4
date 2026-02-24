"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentSuccessProps {
  amount: number;
}

export default function PaymentSuccess({
  amount,
}: PaymentSuccessProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-500 animate-fadeIn">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Payment Successful
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Thank you for your payment. Your order is being processed.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t my-6" />

        {/* Payment Details */}
        <div className="space-y-4 text-sm sm:text-base">
          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid</span>
            <span className="font-medium text-gray-900">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8">
          <Button
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300"
          >
            View Order History
          </Button>
        </div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInUp 0.6s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}