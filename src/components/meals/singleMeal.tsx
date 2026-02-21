'use client'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useCartStore } from '@/store/CartStore'
import Link from 'next/link'
const SignleMealByid = ({ meal }: any) => {
  const addToCart = useCartStore((state) => state.addToCart)
  return (
    <div>

      <div className="bg-[#f8fafc] min-h-screen py-10 px-4">
        <div className="max-w-[1440px] mx-auto space-y-12">

          {/* HERO SECTION */}
          <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-xl">
      
            <img
              src={meal.image}
              alt={meal.meals_name}
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              onError={(e: any) => {
                e.target.src = "/images/default-meal.jpg";
              }}
              width={400}
              height={300}
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
                <p className="text-gray-600 leading-relaxed text-lg">
                  {meal.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mt-8 text-sm">
                  <div>
                    <span className="text-gray-500">Category</span>
                    <p className="font-semibold">{meal.category?.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Dietary</span>
                    <p className="font-semibold">{meal.dietaryPreference}</p>
                  </div>
                </div>
              </div>

              {/* REVIEWS SECTION */}
              <div className="bg-white rounded-2xl shadow p-8">
                {/* <h2 className="text-2xl font-bold mb-6">
                Customer Reviews ({reviews.length})
              </h2> */}

                {/* Rating Summary */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    {/* <div className="text-5xl font-bold text-orange-500">
                    {averageRating}
                  </div> */}
                    <p className="text-gray-500">Average Rating</p>
                  </div>

                  {/* <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingCount(star);
                    const percentage =
                      reviews.length > 0
                        ? (count / reviews.length) * 100
                        : 0;

                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-6 text-sm">{star}★</span>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div> */}
                </div>

                {/* Individual Reviews */}
                {/* <div className="space-y-6">
                {reviews.length === 0 && (
                  <p className="text-gray-500">No reviews yet.</p>
                )}

                {reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="border-t pt-6 flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                      {review.user?.image && (
                        <Image
                          src={review.user.image}
                          alt="user"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">
                          {review.user?.name || "Anonymous"}
                        </h4>
                        <span className="text-orange-500 text-sm">
                          {review.rating}★
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div> */}
              </div>

            </div>

            {/* RIGHT SIDE - STICKY ORDER CARD */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-4xl font-extrabold text-orange-600">
                  ${meal.price.toFixed(2)}
                </div>

                <div className='flex flex-wrap items-center justify-between'>
                  <Button
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
                        id: meal.id,
                        name: meal.name,
                        price: meal.price,
                        image: meal.image,
                        quantity: 1,
                      })
                    }
                    className={` text-white px-4 py-1.5 rounded-lg hover:bg-gray-800${meal.isAvailable ? "cursor-pointer bg-black" : "cursor-not-allowed bg-black/50"}`}
                  >
                    Add to cart
                  </button>
                </div>


                {/* Provider */}
                <div className="border-t pt-6">
                  <Link href={`/provider/${meal.provider?.id}`} className='w-full h-32 mb-4'>
                    <img src={meal.provider?.image ? meal.provider?.image : "/default-meal.jpg"} alt="provider" className="w-full h-32 object-cover rounded-lg" />
                  </Link>
                  <div>
                    <h3 className="font-semibold mb-1">Provided By</h3>
                    <p className="text-sm text-gray-600">
                      {meal.provider?.restaurantName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {meal.provider?.address}
                    </p>
                  </div>



                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default SignleMealByid
