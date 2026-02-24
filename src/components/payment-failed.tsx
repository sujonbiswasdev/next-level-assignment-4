"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PaymentFailedProps {
  message?: string;
}

export default function PaymentFailed({
  message = "An error occurred while processing your transaction. Please try again or use a different payment method.",
}: PaymentFailedProps) {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center animate-fadeIn">

        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 p-6 rounded-full">
            <X className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-900">
          Payment Failed
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        <div className="mt-8">
          <Button
            onClick={() => router.back()}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Try Again
          </Button>
        </div>
      </div>

      {/* Smooth Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInUp 0.5s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
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