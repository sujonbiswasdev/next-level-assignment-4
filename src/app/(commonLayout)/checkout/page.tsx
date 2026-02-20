"use client"

import { useCartStore } from "@/store/CartStore"


export default function CheckoutPage() {
  const { cart, getSubtotal, clearCart } =
    useCartStore()

  const handlePayment = async () => {
    alert("Redirecting to payment gateway...")
    clearCart()
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        Payment Page
      </h1>

      <button
        onClick={handlePayment}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Pay ${getSubtotal().toFixed(2)}
      </button>
    </div>
  )
}