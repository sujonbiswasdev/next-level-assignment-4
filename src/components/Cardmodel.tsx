"use client"
import { useCartStore } from "@/store/CartStore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const SHEET_SIDES = ["right"] as const

export function CartModal() {
  const {
    cart,
    increase,
    decrease,
    removeFromCart,
    clearCart,
    getSubtotal,
    getTotal
  } = useCartStore()

  const router = useRouter()

  const subtotal = getSubtotal()
  const tax = subtotal * 0.1
  const total = getTotal() as number
  return (
    <div className="flex flex-wrap gap-2 ">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side} >
          <SheetTrigger asChild className="">
            <button
              className="relative "
            >
              🛒
              <span className={`${cart.length===0?"":"absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full text-white text-sm"}`}>
                {cart.length===0?"":cart.length}
              </span>
           
            </button>
          </SheetTrigger>
          <SheetContent
            side={side}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader className="h-screen overflow-auto">
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
                {cart.length === 0 && <p>No items added.</p>}
                {cart.map((item) => (
                  <div key={item.id} className="mb-4 border-b pb-3">
                    <h3>{item.name}</h3>
                    <p>${item.price * item.quantity}</p>
                    <div className="max-w-[40px] max-h-[40px]">
                      <img src={item.image} className="rounded-full size-10 " alt="" />
                    </div>

                    <div className="flex gap-3 mt-2 items-center">
                      <button onClick={() => decrease(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increase(item.id)}>+</button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6 border-t pt-4">
                  <p>Subtotal: ${subtotal.toFixed(2)}</p>
                  <p>Tax (10%): ${tax.toFixed(2)}</p>
                  <p className="font-bold text-lg">
                    Total: ${total.toFixed(2)}
                  </p>
                </div>


              </SheetDescription>
            </SheetHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
            </div>
            <SheetFooter>
              <button
                onClick={() => clearCart()}
                className="w-full px-2 py-1 rounded-md ml-auto bg-black text-white"
              >
                clear chat
              </button>
              <Button type="submit" onClick={() => {
                router.push("/payment")
              }}>checkout</Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
