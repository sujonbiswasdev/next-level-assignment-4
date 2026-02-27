'use client'
import React, { useMemo, useState } from 'react';
import { Filter, X, ChevronDown, Star } from 'lucide-react';
import MealCard from '../meals/MealCard';
import MealsCard from '../meals/get-meals';
import { cuisines, dietaryPreferences } from '@/types/meals/mealstype';

const Singlecategory = ({ meal }: { meal: any }) => {
  console.log(meal, 'mealsdata')
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 100]);

  const categories = {
    cuisines,
    dietaryPreferences,
    rating: [4, 3, 2]
  };

 

  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])

  const meals: any[] = [...meal]

  const handleCuisineChange = (value: string) => {
    setSelectedCuisine(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  // const handleDietaryChange = (value: string) => {
  //   setSelectedDietary(prev =>
  //     prev.includes(value)
  //       ? prev.filter(item => item !== value)
  //       : [...prev, value]
  //   )
  // }

  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {

      const cuisineMatch =
        selectedCuisine.length === 0 ||
        selectedCuisine.includes(meal.cuisine)

      // const dietaryMatch =
      //   selectedDietary.length === 0 ||
      //   selectedDietary.every(d =>
      //     meal.dietary.includes(d)
      //   )

      return cuisineMatch
    })
  }, [selectedCuisine, selectedDietary, meals])


  if (!filteredMeals) {
    return (
      <div className="p-4 text-red-500">
        Failed to load meals
      </div>
    );
  }

  return (
    <div className="relative">
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
        {/* <label className="flex items-center gap-2">
  <input
    type="checkbox"
    onChange={() => handleCuisineChange("Inddian")}
  />
  Indiand
</label> */}

        {/* <button
  onClick={() => handleDietaryChange("Gluten-Free")}
  className={`px-3 py-1 rounded-full border
    ${selectedDietary.includes("Gluten-Free")
      ? "bg-black text-white"
      : "bg-white text-black"
    }`}
>
  Gluten-Free
</button> */}
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
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Price Range</h3>
              <input
                type="range"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                min="5" max="150"
              />
              <div className="flex justify-between mt-2 text-sm font-medium text-slate-600">
                <span>$5</span>
                <span>$150</span>
              </div>
            </section>

            {/* 2. Cuisine Section */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Cuisine</h3>
              <div className="grid grid-cols-1 gap-3">
                {categories.cuisines.map((item) => (
                  <label key={item} className="flex items-center group cursor-pointer">
                    <input type="checkbox" onChange={() => handleCuisineChange(item)} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-3 text-slate-700 group-hover:text-emerald-700 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* 3. Dietary Preferences */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Dietary</h3>
              <div className="flex w-auto md:w-40 flex-wrap gap-2">
                {categories.dietaryPreferences.map((item) => (
                  <button key={item} className="px-3 py-1.5 border border-slate-200 rounded-full text-xs font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all">
                    {item}
                  </button>
                ))}
              </div>
            </section>

            {/* 4. Provider Rating */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Provider Rating</h3>
              {categories.rating.map((stars) => (
                <label key={stars} className="flex items-center mb-2 cursor-pointer">
                  <input type="radio" name="rating" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                  <div className="ml-3 flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} />
                    ))}
                    <span className="ml-2 text-xs text-slate-500">& Up</span>
                  </div>
                </label>
              ))}
            </section>
          </div>

          {/* Footer Actions */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-slate-100 lg:static lg:p-0 lg:border-none lg:mt-8">
            <button className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
              Apply Filters
            </button>
            <button className="w-full mt-2 py-2 text-sm text-slate-500 font-medium hover:underline">
              Reset All
            </button>
          </div>
        </aside>

        <div className='mt-10'>
          <MealCard filterData={filteredMeals} />
        </div>


      </div>
    </div>
  );
};

export default Singlecategory;