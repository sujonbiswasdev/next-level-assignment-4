import { getMeals } from "@/actions/blog.meals";
import { getCategory } from "@/actions/categories/category";
import FoodCategories from "@/components/category/card";
import HeroSlider from "@/components/heroslider";
import MealCard from "@/components/meals/MealCard";
import Marquee from "react-fast-marquee";
import { Category } from "@/types/category";
import { MealData, providerRating } from "@/types/meals/mealstype";
import Link from "next/link";
import TestimonialSection from "@/components/TestimonialSection";
import { getAlluserProvider } from "@/actions/provider.action";
import { ProviderProfile } from "@/types/user/user";
export default async function HomePage() {
  const categories = await getCategory()
  console.log(categories,'categorydata')
    const response = await getMeals();
    const {data,providerRating}=await getAlluserProvider()
  if (!categories || categories==null || categories==undefined) {
    return (
      <div className="p-4 text-red-500">
        Failed to load category
      </div>
    );
  }
  return (
    <div className="">
      <HeroSlider />
      <FoodCategories categories={categories.data as Category[]} />
      <div className="space-y-8">
       
         <div className="mb-2 mx-auto">
         <div className="flex flex-col items-center space-y-2">
            <h2 className="flex items-center font-bold lg:text-4xl">Browse meals</h2>
            <p className="font-semibold text-gray-400 text-[16px]">Discover delicious dishes from top-rated restaurants in your area</p>
         </div>

          <div className="flex justify-between mt-5">
            <div>

            </div>
            <Link  href={'/meals'} className="w-full text-end text-blue-600 font-semibold text-lg hover:underline ">view menu</Link>
          </div>
         </div>

       <div className="mt-2 md:mt-10 mb-4">
         <MealCard filterData={response.data as MealData[]}/>
       </div>
      </div>
     <div className="mt-4 lg:mt-10">
       <Marquee pauseOnClick direction="left">
       <TestimonialSection testomonialdata={data as ProviderProfile[]} providerRating={providerRating as providerRating}/>
      </Marquee>
     </div>
      
    </div>
  );
}
