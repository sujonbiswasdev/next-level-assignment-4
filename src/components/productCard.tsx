"use client"

import { manageCartStore } from "@/store/CartStore"



export default function ProductCard({ meal }: any) {
  const addToCart = manageCartStore((state) => state.addToCart)
    const defaultIamge='https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png'

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img
        src={meal.image || defaultIamge}
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
                id: meal.id as string,
                mealid: meal.id as string,
                name: meal.meals_name as string,
                price: meal.price,
                image: meal.image || defaultIamge,
                isAvailable: meal.isAvailable,
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