import { MealData } from '@/types/meals/mealstype'
import React, { Suspense } from 'react'
import Skeletonmeals from '../ui/skeletonmeals';
import { CardHoverLift } from '../hover-lift';
import { Link, StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { manageCartStore } from '@/store/CartStore';
import { useRouter } from 'next/navigation';

const MealCard = ({ filterData }: { filterData: MealData[] }) => {
       const { addToCart} =
          manageCartStore()
          const router=useRouter()
      const defaultIamge = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png'
      
    return (
        <div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
                {filterData.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <div className="text-4xl mb-4">😔</div>
                        <p className="text-xl font-semibold text-gray-600 mb-2">No meals found</p>
                        <p className="text-gray-500">Try different filters</p>
                    </div>
                ) : (

                    filterData.map((meal: MealData, index: number) => {
                        const mainReviews = meal.reviews.filter(r => r.rating > 0);
                        const totalReviews = mainReviews.length;
                        const avgRating =
                            totalReviews > 0
                                ? (mainReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
                                : "No rating";
                        const fullStars = Math.floor(totalReviews);
                        return <div key={index}>
                            <Suspense fallback={<Skeletonmeals />}>
                                <CardHoverLift>
                                    <div className="relative w-full h-60 overflow-hidden rounded-lg">
                                        <img
                                            src={meal.image || defaultIamge}
                                            alt={meal.meals_name}
                                            loading="lazy"
                                            className="object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                            {meal.category_name}

                                        </span>
                                        <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${meal.isAvailable ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                                            }`}>
                                            {meal.isAvailable ? "Available" : "Sold Out"}
                                        </span>
                                    </div>

                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold text-gray-900">
                                                {meal.meals_name.length > 20 ? `${meal.meals_name.slice(0, 20)}...` : meal.meals_name}
                                            </h2>
                                            <div className="flex items-center gap-0.5">
                                                {
                                                    Array.from({ length: fullStars }).map((_, i) => (
                                                        <div key={i} className="flex items-center">
                                                            <StarIcon className="w-[20px] bg-amber-400" />
                                                        </div>
                                                    ))
                                                }
                                                ({totalReviews} Reviews)
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                            {meal?.description?.length! > 20 ? `${meal.description!.slice(0, 20)}...` : meal.description}
                                        </p>
                                        <div className="flex justify-between meals-center pt-3 border-t">
                                            <p className="text-xs text-gray-500">
                                                {meal.cuisine} • {meal.dietaryPreference}
                                            </p>
                                            <span className="text-2xl font-bold text-amber-600">
                                                ${meal.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between meals-center ">
                                        <Button onClick={()=>router.push(`/meals/${meal.id}`)} className="px-4 bg-gradient-to-r from-gray-900 to-black text-white py-1.5 rounded-md font-semibold hover:from-gray-800 hover:shadow-2xl transition-all cursor-pointer mb-2 ml-3">
                                            View Details →
                                        </Button>
                                        <Button
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
                                            disabled={!meal.isAvailable}
                                            className={`mb-2 mr-2 ${meal.isAvailable ? "cursor-pointer" : "cursor-not-allowed"}`}
                                        >
                                            Add to cart
                                        </Button>

                                    </div>

                                </CardHoverLift>
                            </Suspense>
                        </div>
                    })
                )}
            </div>
        </div>
    )
}

export default MealCard
