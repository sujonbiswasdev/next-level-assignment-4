"use client";
import { TResponseMeals } from "@/types/meals.type";

import { manageCartStore } from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { TResponseproviderData } from "@/types/provider.type";
import AdvancedImageSkeleton from "@/components/shared/ImageCardSkeleton";

const MealCard = ({ meal }: { meal: TResponseMeals<{provider:TResponseproviderData}> }) => {
  const { addToCart } = manageCartStore();
  const router = useRouter();
  const fullStars = Math.floor(Number(meal.averageRating));
  const hasHalfStar = Number(meal.averageRating) % 1 >= 0.5;

  return (
    <div className="w-full mx-auto p-4">
      <div className="grid grid-cols-1">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
          {/* Image Section */}
          <div className="relative w-full h-60 overflow-hidden">
          {meal.image ? (
          <AdvancedImageSkeleton src={meal.image} alt={meal.meals_name} />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-800">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}

            {/* Category */}
            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              {meal.category_name}
            </span>

            {/* Availability */}
            <span
              className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                meal.isAvailable
                  ? "bg-emerald-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {meal.isAvailable ? "Available" : "Sold Out"}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {meal.meals_name}
              </h2>

              {/* Rating */}
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < fullStars) {
                    return (
                      <span key={i} className="text-amber-400">★</span>
                    );
                  }

                  if (i === fullStars && hasHalfStar) {
                    return (
                      <span key={i} className="text-amber-400">☆</span>
                    );
                  }

                  return (
                    <span key={i} className="text-gray-300">★</span>
                  );
                })}
                <span className="text-[10px] text-gray-500 ml-2">
                  ({meal.totalReview || 0} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {meal.description}
            </p>

            {/* Info */}
            <div className="flex justify-between items-center  pt-3 border-t">
              <p className="text-xs text-gray-500">
                {meal.cuisine} • {meal.dietaryPreference}
              </p>
              <span className="text-2xl font-bold text-amber-600">
                ${meal.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-between items-center mb-4 px-4 pb-y">
            <button
              onClick={() => router.push(`/meals/${meal.id}`)}
              className="bg-gradient-to-r from-gray-900 to-black text-white text-[14px] px-2 py-1 rounded-md font-semibold hover:from-gray-800 hover:shadow-2xl transition-all"
            >
              View Details →
            </button>

            <button
              onClick={() =>
                addToCart({
                  id: meal.id,
                  mealid: meal.id,
                  name: meal.meals_name,
                  price: meal.price,
                  image: meal.image as string,
                  isAvailable: meal.isAvailable,
                  quantity: 1,
                })
              }
              disabled={!meal.isAvailable}
              className={`px-2 py-1 text-[14px] rounded-md font-semibold transition-all ${
                meal.isAvailable
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
