'use client'
import { getMeals } from "@/actions/blog.meals"
import { MealFormData } from "@/types/mealsType"
import Image from "next/image"
import { CardHoverLift } from "../hover-lift"
import { Suspense, useEffect, useState, useTransition } from "react"
import MealLoading from "@/app/(commonLayout)/meals/loading"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import PaginationPage from "./Pagination"
import Link from "next/link"
import { Button } from "../ui/button"
import { useCartStore } from "@/store/CartStore"
import Skeletonmeals from "../ui/skeletonmeals"
import { toast } from "sonner"

const dietaryOptions = [
  "HALAL",
];
const MIN_PRICE_LIMIT = 0;
const MAX_PRICE_LIMIT = 1000;
export default function RecipeCard({ initialMeals, initialcategory, pagination }: any) {
  const addToCart = useCartStore((state) => state.addToCart)
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setsearch] = useState('')
  const [isPending, startTransition] = useTransition();
  const urlCategory = searchParams.get("category_name") || null
  const urlAvailable = searchParams.get('isAvailable') == "true" ? 'true' : searchParams.get('isAvailable') == "false" ? "false" : null;
  const priceParam = searchParams.get("price");
  const [price, setPrice] = useState(
  priceParam ? Number(priceParam) : null
);

  const handlePriceChange = (value: string) => {
    let parsed = Number(value);

    if (isNaN(parsed)) {
      { price == null ? "" : setPrice(MIN_PRICE_LIMIT); }
      return;
    }

    if (parsed > MAX_PRICE_LIMIT) {
      toast.error(`max price exceed $${MAX_PRICE_LIMIT}`);
      parsed = MAX_PRICE_LIMIT;
    }

    if (parsed < MIN_PRICE_LIMIT) {
      parsed = MIN_PRICE_LIMIT;
    }

    setPrice(parsed);
    updateFilter("price", parsed.toString());
  };

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === '' || value==='0') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    })

  };

  const filterData = initialMeals.filter((item: any) => (item.meals_name.includes(search.toLowerCase()) || item.description.includes(search.toLowerCase()) || item.category_name.includes(search.toLowerCase()) || item.cuisine.includes(search.toLowerCase())))

  return (
    <div>

      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 md:p-8 rounded-3xl shadow-2xl mb-8 border border-emerald-200">
        <div className="flex flex-col lg:flex-row gap-4 items-end">

          {/* input search fileter */}
          <input
            type="text"
            value={search}
            placeholder="🔍 Search meals, description, cuisine..."
            onChange={(e) => setsearch(e.target.value)}
            className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 text-lg shadow-lg hover:shadow-xl transition-all"
          />

          {/* category name fileter */}

          <select
            onChange={(e) => updateFilter("category_name", e.target.value)}
            className="p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-300 bg-white shadow-lg hover:shadow-xl transition-all min-w-[200px]"
          >
            <option value="">All Categories</option>
            {initialcategory.map((item: any) => (<option value={item.name}>{item.name}</option>))}
          </select>


          {/* is available check */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border">
            <span className="font-semibold text-gray-700 whitespace-nowrap">
              {/* {urlAvailable=='true'?"available":urlAvailable=='false'?'not available':"All"} */}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"

                onChange={(e) => updateFilter("isAvailable", e.target.checked.toString())}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* clear button show funtionality */}
          {(urlCategory || urlAvailable || price || price == 0) && (
            <button
              onClick={() => router.push(pathname)}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:from-gray-600 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>

  <div className="flex justify-between items-center flex-wrap gap-4 mt-4"> 
          {/* Dietary Preference */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dietary Preference
          </label>
          <select
            onChange={(e) => updateFilter("dietaryPreference", e.target.value)}
            className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 px-4 py-2 outline-none transition"
          >
            {dietaryOptions.map((option, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/*  Price */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price ($)
          </label>
          <input
            type={price as any>0 ?"number":"text"}
            value={price as any>0?price:"" as any}
            onChange={(e) => handlePriceChange(e.target.value)}
            placeholder="please enter your price"
            className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 px-4 py-2 outline-none transition"
          />
        </div>
  </div>


        {/* Results show  */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-emerald-200">
          <p className="text-lg font-semibold text-gray-800">
            Showing {filterData.length} meals
            {urlCategory && ` • ${urlCategory}`}
            {urlAvailable !== null && ` • ${urlAvailable == 'true' ? 'Available' : urlAvailable == 'false' ? "not Available" : "All"}`}
          </p>

          <div>
            <PaginationPage pagination={pagination} />
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
        {filterData.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="text-4xl mb-4">😔</div>
            <p className="text-xl font-semibold text-gray-600 mb-2">No meals found</p>
            <p className="text-gray-500">Try different filters</p>
          </div>
        ) : (

          filterData.map((item: MealFormData, index: number) => (
            <div key={index}>
              <Suspense fallback={<Skeletonmeals />}>
                <CardHoverLift>
                  <div className="relative w-full h-55 overflow-hidden rounded-lg">
                    <Image
                      src={item.image?.startsWith("https") ? item.image : "https://images.pexels.com/photos/2903384/pexels-photo-2903384.jpeg"}
                      alt={item.meals_name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      {item.category_name}
                    </span>
                    <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${item.isAvailable ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                      }`}>
                      {item.isAvailable ? "Available" : "Sold Out"}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold text-gray-900">{item.meals_name}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <p className="text-xs text-gray-500">
                        {item.cuisine} • {item.dietaryPreference}
                      </p>
                      <span className="text-2xl font-bold text-amber-600">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center ">
                    <Link href={`/meals/${item.id}`} className="px-4 bg-gradient-to-r from-gray-900 to-black text-white py-1.5 rounded-md font-semibold hover:from-gray-800 hover:shadow-2xl transition-all cursor-pointer mb-2 ml-3">
                      View Details →
                    </Link>
                    <Button
                      onClick={() =>
                        addToCart({
                          id: item.id as string,
                          name: item.meals_name as string,
                          price: item.price,
                          image: item.image,
                          quantity: 1,
                        })
                      }
                      disabled={!item.isAvailable}
                      className={`mb-2 mr-2 ${item.isAvailable ? "cursor-pointer" : "cursor-not-allowed"}`}
                    >
                      Add to cart
                    </Button>

                  </div>

                </CardHoverLift>
              </Suspense>
            </div>
          ))
        )}
      </div>
    </div>
  );
}