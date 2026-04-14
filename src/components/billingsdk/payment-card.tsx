"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { manageCartStore } from "@/store/CartStore";
import { OrderForm } from "../modules/orders/OrderContactForm";

export interface PaymentCardProps {
  title: string;
  description: string;
  className?: string;
}

export function PaymentCard({
  title,
  description,
  className,
}: PaymentCardProps) {
  const { getSubtotal, getDeliveryCharge } = manageCartStore();
  const subtotal = getSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const total = subtotal + deliveryCharge;
  const [activeButton, setactiveButton] = useState(false);

  return (
    <div className={cn("mx-auto w-full max-w-4xl px-4 md:px-8", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Order Summary */}
        <div className="order-2 md:order-1">
          <div className="space-y-6 md:sticky md:top-8">
            <Card className="rounded-xl shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-gray-800">{title || "Order Summary"}</CardTitle>
              </CardHeader>
              <CardContent>
                {description && (
                  <div className="mb-2 text-muted-foreground text-sm">{description}</div>
                )}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="tabular-nums font-medium text-gray-900">
                      ৳{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Charge</span>
                    <span className="tabular-nums font-medium text-gray-900">
                      ৳{deliveryCharge.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="text-xl font-bold tabular-nums text-indigo-700">
                      ৳{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <span className="mr-1">🔒</span>
              Secure payment & money back guarantee
            </div>
            <div className="md:hidden" />
          </div>
        </div>
        {/* Right: Order Form */}
        <div className="order-1 md:order-2 flex flex-col justify-center">
          <div className="w-full max-w-lg mx-auto">
            <OrderForm setactiveButton={setactiveButton} />
          </div>
        </div>
      </div>
    </div>
  );
}
