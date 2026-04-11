import { getMeals } from "@/actions/meals.action";
import { getCategory } from "@/actions/category";
import { getAlluserProvider } from "@/actions/provider/provider.action";
import FoodCategories from "@/components/modules/category/card";
import HeroSlider from "@/components/heroslider";
import MealCard from "@/components/modules/meals/MealCard";
import Notfounddata from "@/components/Notfounddata";
import TestimonialSection from "@/components/TestimonialSection";
import { TGetCategory } from "@/types/category";
import { IGetMealData } from "@/types/meals.type";
import { IProviderInfo } from "@/types/provider.type";
import Link from "next/link";
export default async function HomePage() {
  const mealdata = await getMeals();
  const categories = await getCategory();
  const providerinfo = await getAlluserProvider();
  console.log(mealdata,'mealdata')
  return (
    <div className="">
      <HeroSlider />
      {(!categories?.success)?<Notfounddata content="categories data not found"/>:<FoodCategories categories={categories?.data.data as TGetCategory[]} />}
      <div className="space-y-8 py-3 mt-4 md:mt-10">
        <div className="mb-2 mx-auto">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="flex items-center font-bold lg:text-4xl">
              Browse meals
            </h2>
            <p className="font-semibold text-gray-400 text-[16px]">
              Discover delicious dishes from top-rated restaurants in your area
            </p>
          </div>

          <div className="flex justify-between mt-5">
            <div></div>
            <Link
              href={"/meals"}
              className="w-full text-end text-blue-600 font-semibold text-lg hover:underline "
            >
              view menu
            </Link>
          </div>
        </div>

        <div className="mt-2 md:mt-10 mb-4">
          {!mealdata.data?.data || !mealdata.success?<Notfounddata content="no meal found"/>:<MealCard filterData={mealdata.data?.data as IGetMealData[]} />}
        </div>
      </div>
      <div className="mt-4 lg:mt-10 bg-[#f8f9fb]">
        {/* <Marquee pauseOnClick direction="left"> */}
        {!providerinfo.data ? <Notfounddata content="provider data not found"/> : 
          <TestimonialSection
            testomonialdata={providerinfo.data as IProviderInfo[]}
          />
        }
        {/* </Marquee> */}
      </div>
    </div>
  );
}
