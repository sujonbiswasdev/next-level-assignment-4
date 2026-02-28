'use client'
import Image from 'next/image'
import { Button } from '../ui/button'
import { manageCartStore } from '@/store/CartStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Status, StatusIndicator, StatusLabel } from '../ui/status'
import { MealData, MealReview } from '@/types/meals/mealstype'
import { useState } from 'react'
import { Star, StarHalf } from 'lucide-react'
import { MealsForm } from './create-meals'
import ReviewForm from '../modules/review/reviewform'
import { ReviewItem } from '../modules/review/reviewitem'
import { User } from '@/types/user/user'
const SignleMealByid = ({ meal }: { meal: MealData }) => {
  console.log(meal.provider.image, 'dkjfkdjf')
  const addToCart = manageCartStore((state) => state.addToCart)
  const router = useRouter()
  const defaultIamge = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png'
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)


  const mainReviews = meal.reviews.filter(
    (r) => r.parentId === null
  );
  const totalReviews = mainReviews.length;
  const avg =
    totalReviews > 0
      ? mainReviews.reduce((sum, r) => sum + r.rating, 0) /
      totalReviews
      : 0;

  const starCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: mainReviews.filter(r => Math.floor(r.rating) === star).length
  }));


   const fullStars = Math.floor(Number(meal.providerRating.averageRating));
  const hasHalfStar = Number(meal.providerRating.averageRating) % 1 >= 0.5;
  return (
    <div>

      <div className="bg-[#f8fafc] min-h-screen py-10 px-4">
        <div className="max-w-[1440px] mx-auto space-y-12">

          {/* HERO SECTION */}
          <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-xl">

            <img
              src={meal.image || defaultIamge}
              alt={meal.meals_name}
              className="w-full h-full object-cover rounded-2xl"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-10 left-10 text-white">
              <h1 className="text-3xl md:text-5xl font-bold">
                {meal.meals_name}
              </h1>
              <p className="mt-2 text-lg opacity-90">{meal.cuisine}</p>
            </div>

            <div className="absolute top-6 right-6">
              <span
                className={`px-5 py-2 rounded-full text-sm font-semibold shadow text-white ${meal.isAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
              >
                {meal.isAvailable ? "Available" : "Sold Out"}
              </span>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-10">

              {/* DESCRIPTION */}
              <div className="bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-bold mb-4">About This Meal</h2>
                <div className="grid sm:grid-cols-3 gap-6 mt-8 text-sm">
                  <div>
                    <span className="text-gray-500">Category</span>
                    <div className='flex items-center gap-2 mt-1.5'>
                      <img src={meal.category.image} className='w-[40px] h-[40px] rounded-full' alt="" />
                      <p className="font-semibold">{meal.category.name}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Dietary</span>
                    <p className="font-semibold">{meal.dietaryPreference}</p>
                  </div>

                  <div>
                    <span className="text-gray-500">cuisine</span>
                    <p className="font-semibold">{meal.cuisine}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">price</span>
                    <p className="font-semibold">{meal.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">createdAt</span>
                    <p className="font-semibold">{meal.createdAt.slice(0, 10)}</p>
                  </div>
                  <div className=' flex flex-col'>
                    <span className="text-gray-500">isAvailable</span>
                    {meal.isAvailable ? (
                      <Status variant="success" className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                        <StatusIndicator />
                        <StatusLabel>Available</StatusLabel>
                      </Status>
                    ) : (
                      <Status variant="error" className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                        <StatusIndicator />
                        <StatusLabel>Unavailable</StatusLabel>
                      </Status>
                    )}
                  </div>

                  <div className="px-5 py-4 flex flex-col">
                    <span className="text-gray-500">status</span>
                    {(() => {
                      const status = meal.status;

                      const statusStyles: any = {
                        APPROVED: "bg-green-500 text-white",
                        PENDING: "bg-yellow-500 text-white",
                        REJECTED: "bg-red-500 text-white",
                      };

                      const variantMap: any = {
                        APPROVED: "success",
                        PENDING: "warning",
                        REJECTED: "error",
                      };

                      return (
                        <Status
                          variant={variantMap[status] || "default"}
                          className={`${statusStyles[status] || "bg-gray-400 text-white"} px-3 py-1 rounded-full text-xs`}
                        >
                          <StatusIndicator />
                          <StatusLabel>{status}</StatusLabel>
                        </Status>
                      );
                    })()}
                  </div>


                </div>
                <div>
                  <h2 className='font-semibold text-lg text-gray-800'>Description</h2>
                  <p className="text-gray-600 leading-relaxed text-lg mt-5">
                    {meal.description}
                  </p>
                </div>

              </div>

              {/* REVIEWS SECTION */}
              <div className="bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Customer Reviews ({totalReviews})
                </h2>

                {/* Rating Summary */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>

                    <div className="text-5xl font-bold text-orange-500">
                      {avg.toFixed(1)}
                    </div>
                    <p className="text-gray-500">Average Rating</p>
                  </div>
                  <div className="gap-2 mb-6 ">

                    {starCounts.map(({ star, count }) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="w-12 text-sm">{star} star</span>

                        {/* simple bar */}
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${totalReviews ? (count / totalReviews) * 100 : 0}%` }}
                          />
                        </div>

                        <span className="w-6 text-sm">{count}</span>
                      </div>
                    ))}

                  </div>


                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {totalReviews === 0 && (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}

                  {mainReviews.map((review: MealReview, index: number) => (
                    <div key={review.id} className="border-t pt-6 flex gap-4">

                      <ReviewItem
                        review={review}
                        meal={meal}
                        activeReplyId={activeReplyId}
                        setActiveReplyId={setActiveReplyId}
                        totalLength={review.replies.length}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT SIDE - STICKY ORDER CARD */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-4xl font-extrabold text-orange-600">
                  ${meal.price.toFixed(2)}
                </div>

                <div className='flex flex-wrap items-center justify-between'>
                  <Button onClick={() => router.push("/cart")}
                    disabled={!meal.isAvailable}
                    className={`py-2 px-4  rounded-sm text-lg font-semibold transition ${meal.isAvailable
                      ? "bg-black hover:bg-gray-900 cursor-pointer text-white"
                      : "bg-gray-400 cursor-not-allowed text-white"
                      }`}
                  >
                    {meal.isAvailable
                      ? "Order Now"
                      : "Currently Unavailable"}
                  </Button>
                  <button
                    disabled={!meal.isAvailable}
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
                    className={` text-white px-4 py-1.5 rounded-lg hover:bg-gray-800${meal.isAvailable ? "cursor-pointer bg-black" : "cursor-not-allowed bg-black/50"}`}
                  >
                    Add to cart
                  </button>
                </div>


                {/* Provider */}
                <div className="border-t pt-6 ">
                  <h3 className="font-semibold mb-1">Provided By</h3>
                  <div className='flex items-center justify-between'>
                    <Link href={`/providers/${meal.provider?.id}`} className='w-[15px] h-[15px] mb-4'>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-primary shadow-md">
                        <Image
                          src={meal.provider.image || defaultIamge}
                          alt={meal.provider.restaurantName}
                          fill
                          priority
                          className="object-cover"
                        />
                      
                      </div>
                    </Link>

                        <div className='flex items-center'>
                          {Array.from({ length: 5 }).map((_, i) => {
                            if (i < fullStars) {
                              return (
                                <Star
                                  key={i}
                                  className="w-[14px] text-amber-400 fill-amber-400"
                                />
                              );
                            }

                            if (i === fullStars && hasHalfStar) {
                              return (
                                <StarHalf
                                  key={i}
                                  className="w-[14px] text-amber-400 fill-amber-400"
                                />
                              );
                            }

                            return (
                              <Star
                                key={i}
                                className="w-[14px] text-gray-300"
                              />
                            );
                          })}
                          <span className='text-sm text-gray-500 gap-2'>({meal.providerRating.totalReview}reviews)</span>

                        </div>

                  </div>

                  <div className='mt-2 space-y-1'>
                    <div className='flex items-center flex-wrap gap-1.5'>
                      <p className='text-gray-800'>Restaurant Name :</p>
                      <p className="text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.provider?.restaurantName}
                      </p>
                    </div>

                    <div className='flex items-center flex-wrap gap-1.5'>
                      <p className='text-gray-800'>Address :</p>
                      <p className="text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.provider?.address}
                      </p>
                    </div>

                    <div className='flex items-center flex-wrap gap-1.5'>
                      <p className='text-gray-800'>Name :</p>
                      <p className="text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.meals_name}
                      </p>
                    </div>

                    <div className='flex items-center flex-wrap gap-1.5'>
                      <p className='text-gray-800'>Email :</p>
                      <p className="text-sm text-gray-600 shadow-sm rounded-sm p-1">
                        {meal.provider.user.email}
                      </p>
                    </div>
                    <div className='flex items-center '>
                      <h4>isActive : </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-sm font-semibold ${meal.provider.user.isActive ? "bg-green-100 text-green-700" : " text-red-700"
                          }`}
                      >

                        {meal.provider.user.isActive ? (<Status variant="success" className="bg-green-500 text-white">
                          <StatusIndicator />
                          <div className='flex items-center'>
                            <p className='text-gray-800'>Active</p>
                            <StatusLabel ></StatusLabel>
                          </div>

                        </Status>) : (<Status variant="error" className="bg-red-400 text-white">
                          <StatusIndicator />
                          <div className='flex items-center'>
                            <p className='text-gray-800'>unActive</p>
                            <StatusLabel ></StatusLabel>
                          </div>
                        </Status>)}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>



            {/* meals form */}
            <ReviewForm mealId={meal.id} />

            <div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default SignleMealByid
