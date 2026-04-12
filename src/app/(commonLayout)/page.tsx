import { getCategory } from "@/actions/category";
import FoodCategories from "@/components/modules/category/card";
import HeroSlider from "@/components/heroslider";
import MealCard from "@/components/modules/meals/MealCard";
import Notfounddata from "@/components/Notfounddata";
import TestimonialSection from "@/components/TestimonialSection";
import {  TResponseCategoryData } from "@/types/category";
import {  TResponseMeals } from "@/types/meals.type";
import {  TResponseproviderData } from "@/types/provider.type";
import Link from "next/link";
import { getAllMeals } from "@/actions/meals.action";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { getTopProviderUser } from "@/actions/provider.actions";
export default async function HomePage() {
  const mealdata = await getAllMeals();
  const categories = await getCategory();
  const providerinfo = await getTopProviderUser();
  console.log(providerinfo.data,'data')
  if (!categories?.success || !providerinfo.success || !mealdata.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <Notfounddata
          content="Required data not found! Please try again later."
          emoji="⚠️"
        />
      </div>
    );
  }
  return (
    <div className="">
      <HeroSlider />
      <ErrorBoundary
        fallback={
          <Notfounddata
            content="Something went wrong loading categories"
            emoji="⚠️"
          />
        }
      >
        {!categories?.success || !categories.data ? (
          <Notfounddata content="categories data not found" />
        ) : (
          <FoodCategories
            categories={categories?.data as TResponseCategoryData[]}
          />
        )}
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
        <ErrorBoundary
          fallback={
            <Notfounddata
              content="Something went wrong loading meals"
              emoji="⚠️"
            />
          }
        >
          <div className="mt-2 md:mt-10 mb-4">
            {!mealdata.data || !mealdata.success ? (
              <Notfounddata content="no meal found" />
            ) : (
              // Give the grid a key for each unique meal instead of rendering the entire grid for every meal
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {mealdata.data.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={
                      meal as TResponseMeals<{
                        provider: TResponseproviderData;
                      }>
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </ErrorBoundary>
      </div>
      <div className="mt-4 lg:mt-10 bg-[#f8f9fb]">
        <ErrorBoundary
          fallback={
            <Notfounddata
              content="Something went wrong loading providers"
              emoji="⚠️"
            />
          }
        >
          {!providerinfo.data.data.topProviders ? (
            <Notfounddata content="provider data not found" />
          ) : (
            <TestimonialSection 
              testomonialdata={
                providerinfo.data.data.topProviders as any
              }
            />
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
