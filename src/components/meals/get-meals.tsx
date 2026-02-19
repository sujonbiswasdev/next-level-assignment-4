'use client'
import { getMeals } from "@/actions/blog.meals"
import { MealFormData } from "@/types/mealsType"
import Image from "next/image"
import { CardHoverLift } from "../hover-lift"
import { Suspense, useEffect, useState, useTransition } from "react"
import MealLoading from "@/app/(dashboardLayout)/@provider/provider-dashboard/meals-get/loading"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import PaginationPage from "./Pagination"

export default function RecipeCard({ initialMeals ,initialcategory,pagination}: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search,setsearch]=useState('')
    const [isPending, startTransition] = useTransition();

  const urlCategory=searchParams.get("category_name") || null
 const urlAvailable = searchParams.get('isAvailable')=="true"?'true':searchParams.get('isAvailable')=="false"?"false":null;


  const updateFilter = (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      startTransition(()=>{
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
            {initialcategory.map((item:any)=>(<option value={item.name}>🍕 {item.name}</option>))}
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
          {(urlCategory ||urlAvailable) && (
            <button
              onClick={() => router.push(pathname)}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:from-gray-600 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results show  */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-emerald-200">
          <p className="text-lg font-semibold text-gray-800">
            Showing {filterData.length} meals 
            {urlCategory && ` • ${urlCategory}`}
            {urlAvailable !== null && ` • ${urlAvailable=='true' ? 'Available' : urlAvailable=='false'?"not Available":"All"}`}
          </p>
          
          <div>
            <PaginationPage pagination={pagination}/>
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
            <div key={ index}>
              <Suspense fallback={<MealLoading />}>
                <CardHoverLift>
                  <div className="relative w-full h-52 overflow-hidden rounded-lg">
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
                    <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                      item.isAvailable ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
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

                  <button className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-3 rounded-2xl font-semibold hover:from-gray-800 hover:shadow-2xl transition-all">
                    View Details →
                  </button>
                </CardHoverLift>
              </Suspense>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



// 'use client'

// import { useState, useTransition } from "react"
// import { useRouter, useSearchParams, usePathname } from "next/navigation"

// export default function RecipeCard({ initialMeals }: any) {

//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const [search, setSearch] = useState("")
//   const [isPending, startTransition] = useTransition()

//   const meals = initialMeals

//   // URL update function
//   const updateFilter = (key: string, value: string | null) => {
//     const params = new URLSearchParams(searchParams.toString())

//     if (!value) {
//       params.delete(key)
//     } else {
//       params.set(key, value)
//     }

//     startTransition(() => {
//       router.push(`${pathname}?${params.toString()}`)
//     })
//   }

//   // Instant search (client side)
//   const filteredMeals = meals.filter((item: any) =>
//     item.meals_name.toLowerCase().includes(search.toLowerCase()) ||
//     item.description.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <div>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search meals..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-3 rounded-lg"
//       />

//       {/* Category Filter */}
//       <select
//         onChange={(e) => updateFilter("category_name", e.target.value)}
//         className="border p-3 ml-3 rounded-lg"
//       >
//         <option value="">All</option>
//         <option value="pizza">Pizza</option>
//         <option value="dessert">Dessert</option>
//         <option value="bengali">Bengali</option>
//       </select>

//       {/* Loading Indicator */}
//       {isPending && (
//         <p className="mt-4 text-blue-500 font-semibold">
//           Updating...
//         </p>
//       )}

//       {/* Meals Grid */}
//       <div className="grid grid-cols-3 gap-6 mt-6">
//         {filteredMeals.map((item: any) => (
//           <div key={item.id} className="border p-4 rounded-xl shadow">
//             <h2 className="font-bold">{item.meals_name}</h2>
//             <p className="text-sm text-gray-600">
//               {item.description}
//             </p>
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }