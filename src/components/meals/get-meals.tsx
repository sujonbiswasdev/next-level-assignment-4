'use client'
import { Suspense, useState, useTransition } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import PaginationPage from "./Pagination"
import { manageCartStore } from "@/store/CartStore"

import { toast } from "sonner"
import { MealData } from "@/types/meals/mealstype"
import { Category } from "@/types/category"
import { pagination } from "@/types/meals/pagination"
import MealCard from "./MealCard"

const dietaryOptions = [
  "HALAL",
];
const MIN_PRICE_LIMIT = 0;
const MAX_PRICE_LIMIT = 1000;
export default function MealsCard({ initialMeals, initialcategory, pagination }: { initialMeals: MealData[], initialcategory: Category[], pagination: pagination }) {
  const addToCart = manageCartStore((state) => state.addToCart)
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

    if (value === null || value === '' || value === '0') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    })

  };

  const filterData = initialMeals.filter((meal: any) => (meal.meals_name.includes(search.toLowerCase()) || meal.description.includes(search.toLowerCase()) || meal.category_name.includes(search.toLowerCase()) || meal.cuisine.includes(search.toLowerCase())))
  return (
    <div>

      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 md:p-8 rounded-3xl shadow-2xl mb-8 border border-emerald-200">
        <div className="flex flex-col lg:flex-row gap-4 meals-end">

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
            {initialcategory?.map((meal: any, index: number) => (<option key={index} value={meal.name}>{meal.name}</option>))}
          </select>


          {/* is available check */}
          <div className="flex meals-center gap-3 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border">
            <span className="font-semibold text-gray-700 whitespace-nowrap">
              {/* {urlAvailable=='true'?"available":urlAvailable=='false'?'not available':"All"} */}
            </span>
            <label className="relative inline-flex meals-center cursor-pointer">
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

        <div className="flex justify-between meals-center flex-wrap gap-4 mt-4">
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
              type={price as any > 0 ? "number" : "text"}
              value={price as any > 0 ? price : "" as any}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="please enter your price"
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 px-4 py-2 outline-none transition"
            />
          </div>
        </div>


        {/* Results show  */}
        <div className="flex justify-between meals-center mt-4 pt-4 border-t border-emerald-200">
          <p className="text-lg font-semibold text-gray-800">
            Showing {filterData.length} meals
            {urlCategory && ` • ${urlCategory}`}
            {urlAvailable !== null && ` • ${urlAvailable == 'true' ? 'Available' : urlAvailable == 'false' ? "not Available" : "All"}`}
          </p>

        
            <PaginationPage pagination={pagination} />
         
        </div>
      </div>

      <MealCard filterData={filterData}/>

    </div>
  );
}