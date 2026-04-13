"use client";
import { TResponseMeals } from "@/types/meals.type";
import { manageCartStore } from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { TResponseproviderData } from "@/types/provider.type";
import AdvancedImageSkeleton from "@/components/shared/ImageCardSkeleton";
import ImageCard from "@/components/shared/ImageCardSkeleton";
import { cn } from "@/lib/utils";

const MealCard = ({
  meal,
  className,
}: {
  meal: TResponseMeals<{ provider: TResponseproviderData }>;
  className?: string;
}) => {
  const { addToCart } = manageCartStore();
  const router = useRouter();
  const fullStars = Math.floor(Number(meal.avgRating));
  const hasHalfStar = Number(meal.avgRating) % 1 >= 0.5;

  // Responsive Card Outer Wrapper - matches rootLayout max-w-[1480px] & is mobile-perfect
  return (
    <div
      className={cn(
        "w-full max-w-[1480px] mx-auto px-1 xs:px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6",
        // Top/bottom padding reduced on mobile
        "py-2 xs:py-3 sm:py-3 md:py-4",
        className
      )}
    >
      <div className="grid grid-cols-1">
        <div
          className={cn(
            "bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100",
            // Minimum height for card content on large screens, more compact on mobile/tablet
            "min-h-[415px] xs:min-h-[400px] sm:min-h-[430px] md:min-h-[445px] lg:min-h-[465px] xl:min-h-[485px]"
          )}
        >
          {/* Image Section */}
          <div
            className={cn(
              "relative w-full",
              // Responsive image heights
              "h-[190px] xs:h-[220px] sm:h-[230px] md:h-[240px] lg:h-[253px] xl:h-[260px] 2xl:h-[268px]",
              "overflow-hidden"
            )}
          >
            {meal.image ? (
              <ImageCard src={meal.image} alt={meal.meals_name} />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-800">
                <span className="text-base xs:text-sm text-gray-500">
                  No Image
                </span>
              </div>
            )}

            {/* Category */}
            <span
              className={cn(
                "absolute top-2 left-2 xs:top-3 xs:left-3 bg-white/95 backdrop-blur-sm text-gray-800 text-[11px] xs:text-xs font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-lg transition"
              )}
            >
              {meal.category_name}
            </span>
            {/* Availability */}
            <span
              className={cn(
                `absolute top-2 right-2 xs:top-3 xs:right-3 text-[11px] xs:text-xs font-bold px-2.5 xs:px-3 py-1.5 rounded-full shadow-lg select-none transition`,
                meal.isAvailable
                  ? "bg-emerald-500/90 text-white"
                  : "bg-red-500/90 text-white"
              )}
            >
              {meal.isAvailable ? "Available" : "Sold Out"}
            </span>
          </div>

          {/* Content */}
          <div className="p-3 xs:p-4 sm:p-5 md:p-6 space-y-2 xs:space-y-3">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900 truncate max-w-[68%] sm:max-w-[75%]">
                {meal.meals_name}
              </h2>

              {/* Rating */}
              <div className="flex items-center flex-shrink-0">
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < fullStars) {
                    return (
                      <span
                        key={i}
                        className="text-yellow-400 text-xs xs:text-base"
                      >
                        ★
                      </span>
                    );
                  }
                  if (i === fullStars && hasHalfStar) {
                    return (
                      <span
                        key={i}
                        className="text-yellow-300 text-xs xs:text-base"
                      >
                        ★
                      </span>
                    );
                  }
                  return (
                    <span
                      key={i}
                      className="text-gray-300 text-xs xs:text-base"
                    >
                      ★
                    </span>
                  );
                })}

                <span className="text-[10px] xs:text-xs text-gray-500 ml-1 xs:ml-2 whitespace-nowrap">
                  ({meal.totalReviews || 0} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm xs:text-base leading-relaxed line-clamp-2">
              {meal.description}
            </p>

            {/* Info */}
            <div className="flex justify-between items-center pt-2 xs:pt-3 border-t">
              <p className="text-xs xs:text-sm text-gray-500 truncate mr-2">
                {meal.cuisine}
                {meal.dietaryPreference && (
                  <> • {meal.dietaryPreference}</>
                )}
              </p>
              <span className="text-xl xs:text-2xl font-bold text-amber-600">
                ${meal.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div
            className={cn(
              // Responsive button wrapper, gap on mobile, horizontal on md+
              "flex flex-col xs:flex-row flex-wrap xs:justify-between items-stretch xs:items-center mb-1.5 xs:mb-3 md:mb-4 px-3 xs:px-4 gap-2 xs:gap-0 pb-2",
              className
            )}
          >
            <button
              onClick={() => router.push(`/meals/${meal.id}`)}
              className={cn(
                "bg-gradient-to-r from-gray-900 to-black text-white text-[13px] xs:text-[14px] px-3 sm:px-4 py-2 rounded-md font-semibold hover:from-gray-800 hover:shadow-2xl transition-all",
                "w-full xs:w-max mb-1 xs:mb-0"
              )}
              style={{ minWidth: 120 }}
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
              className={cn(
                "px-3 sm:px-4 py-2 text-[13px] xs:text-[14px] rounded-md font-semibold transition-all w-full xs:w-max",
                meal.isAvailable
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
              style={{ minWidth: 120 }}
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
