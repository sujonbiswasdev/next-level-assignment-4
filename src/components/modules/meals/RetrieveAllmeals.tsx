'use client'
import { useCallback, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import PaginationPage from "./Pagination"
import { toast } from "sonner"
import MealCard from "./MealCard"
import { Ipagination } from "@/types/pagination.type"
import { cuisines, dietaryPreferences, TResponseMeals } from "@/types/meals.type"
import { useFilter } from "@/components/shared/filter/ReuseableFilter"
import { TFilterField } from "@/types/filter.types"
import { FilterPanel } from "@/components/shared/filter/FilterInput"
import MealCardSkeleton from "./MealCardSkeleton"
import { TResponseproviderData } from "@/types/provider.type"
import { TResponseCategoryData } from "@/types/category"
import { TUser } from "@/types/user.type"
const MIN_PRICE_LIMIT = 0;
const MAX_PRICE_LIMIT = 1000;
export default function RetrieveAllmeals({categories, initialMeals, pagination }: { categories:TResponseCategoryData<{user:TUser}>[],initialMeals: TResponseMeals<{provider:TResponseproviderData}>[], pagination: Ipagination }) {
  const { updateFilters, reset, isPending } = useFilter();
  const [form, setForm] = useState({
    search:"",
    cuisine: "",
    category_name: "",
    isAvailable: true,
    price:null,
    dietaryPreference: "",
  });

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleApply = () => {
    updateFilters(form);
  };

  const handleReset = () => {
    const defaultForm = {
      search:"",
      cuisine: "",
      category_name: "",
      isAvailable: true,
      price: null,
      dietaryPreference: "",
    };
    setForm(defaultForm);
    reset();
  };

  const fields: TFilterField[] = [
    { type: "text", name: "search", value: form.search, placeholder: "Search meal name...", label: "search", onChange: (val) => handleChange("search", val) },
    { type: "select", name: "cuisine", value: form.cuisine, placeholder: "cuisine...", label: "cuisine", onChange: (val) => handleChange("cuisine", val), options: cuisines.map(v => ({ label: v, value: v })) },
    { type: "select", name: "category_name", label: "category_name", value: form.category_name,onChange: (val) => handleChange("category_name", val), options: categories.map(v => ({ label: v.name, value: v.name }))
    },

    {
      type: "select",
      name: "isAvailable",
      label: "isAvailable",
      value: String(form.isAvailable),
      onChange: (val: string) => handleChange("isAvailable", val),
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" }
      ],
    },
    { type: "number", name: "price", label: "Price", value: form.price as any, onChange: (val) => handleChange("price", val) },
    { type: "select", name: "dietaryPreference", value: form.dietaryPreference, placeholder: "e.g. Gluten Free", label: "dietaryPreference", onChange: (val) => handleChange("dietaryPreference", val), options: dietaryPreferences.map(v => ({ label: v, value: v })) },
  ];

  return (
    <section className="w-full flex justify-center py-10 max-w-[1480px] mx-auto">
    <div className="w-full">
      <div className="text-center mb-10 space-y-3 mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        FoodHub — Smart Food Ordering Platform
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        FoodHub connects you with nearby restaurants and home chefs, offering a fast, smart, and seamless food ordering experience powered by modern technology.
        </p>
      </div>

      <section className="mb-8 w-full px-4">
      <FilterPanel
        fields={fields}
        onApply={handleApply}
        onReset={handleReset}
        isPending={isPending}
      />
    </section>

      {/* EVENTS GRID */}

      <div className="relative dark:bg-gray-950">
      {isPending && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
           <p className="text-sm font-medium">Filtering data...</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {isPending
          ? Array.from({ length: initialMeals.length || 8 }).map((_, i) => (
              <MealCardSkeleton key={i} />
            ))
          : 
          initialMeals.map((meal,index)=>{
           return <MealCard key={meal.id} meal={meal as TResponseMeals<{provider:TResponseproviderData}>}/>
          })
             
           }
      </div>
      </div>
      {/* PAGINATION */}
      <PaginationPage pagination={pagination} />
    </div>
  </section>
  );
}