"use client"
import { Slide, toast } from "react-toastify"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  increase: (id: string) => void
  decrease: (id: string) => void
  clearCart: () => void
  getSubtotal: () => number,
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exist = state.cart.find((i) => i.id === item.id)
         if(!exist){
          const id = toast.loading("Please wait...")
          toast.dismiss(id)
           toast.success("cart item added sucessfully",{theme:"dark",icon:'🏆' as any})
         }
          if (exist) {
            toast.success("item quentity increase sucessfully",{theme:"dark",icon:'🏆' as any,transition:Slide})
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }

          return { cart: [...state.cart, item] }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
           success:toast.success("cart item delete sucessfully",{theme:"dark"})
          
        })),

      increase: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        })),

      clearCart: () => set({ cart: [] }),

      getSubtotal: () =>
        get().cart.reduce(
          (acc, item) =>
            acc + item.price * item.quantity,
          0
        ),

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const tax = subtotal * 0.1
        const delivery = subtotal > 0 ? 5 : 0

        return subtotal + tax + delivery
      }

    }),
    {
      name: "foodhub-cart", // save to add to cart
    }
  )
)