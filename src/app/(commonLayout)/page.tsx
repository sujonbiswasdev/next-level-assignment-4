import { getCategory } from "@/actions/category";
import FoodCategories from "@/components/modules/category/card";
import HeroSlider from "@/components/heroslider";
import MealCard from "@/components/modules/meals/MealCard";
import Notfounddata from "@/components/Notfounddata";
import TestimonialSection from "@/components/TestimonialSection";
import { TGetCategory, TResponseCategoryData } from "@/types/category";
import { IGetMealData, TResponseMeals } from "@/types/meals.type";
import { IProviderInfo, TResponseproviderData } from "@/types/provider.type";
import Link from "next/link";
import { getAlluserProvider } from "@/actions/user.actions";
import { getAllMeals } from "@/actions/meals.action";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

export default async function HomePage() {
  const mealdata = await getAllMeals();
  const categories = await getCategory();
  const providerinfo = await getAlluserProvider();
  return (
    <div className="">
      <HeroSlider />
      <ErrorBoundary fallback={<Notfounddata content="Something went wrong loading categories" emoji="⚠️" />}>
        {(!categories?.success || !categories.data)
          ? <Notfounddata content="categories data not found"/>
          : <FoodCategories categories={categories?.data as TResponseCategoryData[]} />}
      </ErrorBoundary>
      <div className="space-y-8 py-3 mt-4 md:mt-10">
        <div className="mb-2 mx-auto">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="flex items-center font-bold lg:text-4xl pr-2">
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
        <ErrorBoundary fallback={<Notfounddata content="Something went wrong loading meals" emoji="⚠️" />}>
          <div className="mt-2 md:mt-10 mb-4">
            {
              (!mealdata.data || !mealdata.success)
                ? <Notfounddata content="no meal found" />
                : mealdata.data.map((meal, index) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                     <MealCard key={meal.id} meal={meal as TResponseMeals<{ provider: TResponseproviderData }>} />
                  </div>
                ))
            }
          </div>
        </ErrorBoundary>
      </div>
      <div className="mt-4 lg:mt-10 bg-[#f8f9fb]">
        {/* <Marquee pauseOnClick direction="left"> */}
        <ErrorBoundary fallback={<Notfounddata content="Something went wrong loading providers" emoji="⚠️" />}>
          {
            !providerinfo.data
              ? <Notfounddata content="provider data not found" />
              : <TestimonialSection
                  testomonialdata={providerinfo.data as IProviderInfo[]}
                />
          }
        </ErrorBoundary>
        {/* </Marquee> */}
      </div>
    </div>
  );
}
