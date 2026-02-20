"use client"

import { useCartStore } from "@/store/CartStore"



export default function ProductCard({ meal }: any) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img
        src={meal.image}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{meal.name}</h2>
        <p className="text-gray-500">{meal.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-500 font-bold text-lg">
            ${meal.price}
          </span>

          <button
            onClick={() =>
              addToCart({
                id: meal.id,
                name: meal.name,
                price: meal.price,
                image: meal.image,
                quantity: 1,
              })
            }
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}