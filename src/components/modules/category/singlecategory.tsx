'use client'
import React, { useMemo, useState } from 'react';
import { Filter, X, ChevronDown, Star, StarIcon } from 'lucide-react';
import MealCard from '../meals/MealCard';
import { cuisines, dietaryPreferences, IGetMealData } from '@/types/meals.type';
import { useRouter } from 'next/navigation';
import { TGetCategory, TResponseCategoryData } from '@/types/category';
import { TUser } from '@/types/user.type';

const Singlecategory = ({ category }: { category:TResponseCategoryData<{user:TUser,meals:IGetMealData[]}> }) => {
  
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const categories = {
    cuisines,
    dietaryPreferences,
    rating: [5, 4, 3, 2, 1]
  };
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])

  const meals: IGetMealData[] = Array.isArray(category.meals) ? category.meals : [];

  const handleCuisineChange = (value: string) => {
    setSelectedCuisine(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  const handleDietaryChange = (value: string) => {
    setSelectedDietary(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {

      const cuisineMatch =
        selectedCuisine.length === 0 ||
        selectedCuisine.includes(meal.cuisine)

      const dietaryMatch =
        selectedDietary.length === 0 ||
        selectedDietary.every((d) =>
          meal.dietaryPreference === d
        )

      const priceMatch =
        meal.price >= priceRange[0] &&
        meal.price <= priceRange[1]

      const ratingMatch =
        selectedRating === null || (meal.avgRating !== undefined && meal.avgRating >= selectedRating);
   

      return cuisineMatch && dietaryMatch && priceMatch && ratingMatch
    })
  }, [selectedCuisine, selectedDietary, priceRange, selectedRating, meals])


  if (!filteredMeals) {
    return (
      <div className="p-4 text-red-500">
        Failed to load meals
      </div>
    );
  }

  return (
    <div className="relative w-full">

      {/* Single Category Title & Description (AI Generated) */}
      <div className="mb-8 flex flex-col justify-center text-center items-center mt-4 px-2 mx-auto mt-5 md:mt-10 lg:mt-20">
        <h1 className="text-3xl font-bold text-emerald-700">
          My Project
     
        </h1>
          <p className="mt-2 text-gray-600 text-base max-w-2xl">
          Explore delicious meals within this category. Browse varied cuisines and dietary preferences, compare prices, and discover dishes that suit your taste—all tailored for you.
     
          </p>
      </div>
 
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full shadow-lg active:scale-95 transition-all"
      >
        <Filter size={18} />
        <span className="font-medium">Filter Meals</span>
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className='max-w-[1440px] flex flex-col mx-auto gap-2 md:flex-row space-y-8'>
        {/* Sidebar Container */}
        <aside className={`
        fixed top-0 left-0 w-80 bg-white z-50 p-6 shadow-2xl transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0 lg:shadow-none lg:w-72 lg:block lg:border-r lg:border-slate-100
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Filters</h2>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-slate-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          {/* Filter Groups */}
          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-120px)] pr-2">

            {/* 1. Price Range */}
            <input
              type="range"
              min="1"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([5, Number(e.target.value)])}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="text-sm mt-0.5 text-emerald-600 font-medium">
              Up to ${priceRange[1]}
            </div>
            {/* 2. Cuisine Section */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Cuisine</h3>
              <div className="grid grid-cols-1 gap-3">
                {categories.cuisines.map((item) => (
                  <label key={item} className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCuisine.includes(item)}
                      onChange={() => handleCuisineChange(item)}
                      className="w-2.5 h-2.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-3 text-slate-700 text-[14px] group-hover:text-emerald-700 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* 3. Dietary Preferences */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Dietary</h3>
              <div className="flex w-auto md:w-40 flex-wrap gap-2">
                {categories?.dietaryPreferences?.map((item) => {
                  const isActive = selectedDietary.includes(item)
                  return (
                    <button onClick={() => handleDietaryChange(item)} key={item} className={`${isActive ? "border-blue-700 bg-amber-300" : "border-black"} px-2.5 py-1 border border-slate-200 rounded-full text-xs font-medium hover:border-emerald-500 hover:text-emerald-600 text-[14px] transition-all`}>
                      {item}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* 4. Provider Rating */}
            <div className="gap-2 mb-6 ">
              {[5, 4, 3, 2, 1].map(r => {
                return <label key={r} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={r}
                    checked={selectedRating === r}
                    onChange={() => setSelectedRating(r)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  {Array.from({length:r}).map((_,i)=>(
                     <Star className='w-[20px] bg-amber-300 mt-0.5' key={i} />
                  ))}
                </label>
              })}

            </div>
          </div>

          {/* Footer Actions */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-slate-100 lg:static lg:p-0 lg:border-none lg:mt-8">
            <button
              onClick={() => {
                setSelectedCuisine([])
                setSelectedDietary([])
                setSelectedRating(null)
                setPriceRange([1, 1000])
              }}
              className="bg-blue-700 text-white ml-2 px-4 py-2 rounded-md cursor-pointer mt-2 py-2 text-sm text-slate-500 font-medium hover:underline"
            >
              Reset All
            </button>
          </div>
        </aside>

        <div className='mt-10'>
          {filteredMeals.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No meals found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map((meal, idx) => ( 
                <MealCard key={meal.id || idx} className="justify-center space-x-2 items-center" meal={meal as any} />
              ))}
            </div>
          )}
     
        </div>
      </div>
    </div>
  );
};

export default Singlecategory;