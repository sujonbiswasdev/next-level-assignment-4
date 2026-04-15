import { getCategory } from "@/actions/category";
import { getmealsown } from "@/actions/meals.action";
import MealTable from "@/components/modules/meals/MealsTable";
import MyMealTable from "@/components/modules/meals/MealsTable";
import Notfounddata from "@/components/Notfounddata";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";
import { getSession } from "@/services/auth.service";
import {  TResponseCategoryData } from "@/types/category";
import { Ipagination } from "@/types/pagination.type";
import { TUser } from "@/types/user.type";

interface PageProps {
  searchParams: {
    category_name?: string;
    isAvailable?: string;
  };
}

const HistoryMeals = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search=await searchParams
  try {

  const userinfo=await getSession()
    if (!userinfo || !userinfo.data || !userinfo.data.role) {
      return (
        <ErrorBoundary>
          <Notfounddata content="You must be logged in to view this page." />
        </ErrorBoundary>
      );
    }
    const role = userinfo.data.role;

    const res = await getmealsown(search);
 
    const categories=await getCategory()
    if (!res?.success || !categories?.success) {
      return (
        <ErrorBoundary>
          <Notfounddata content="Unable to retrieve your meals. Please try again later." />
        </ErrorBoundary>
      );
    }
    if (!categories?.success || !Array.isArray(categories?.data) || categories.data.length === 0) {
      return (
        <ErrorBoundary>
          <Notfounddata content="There are no meal categories available. Please add categories before managing meals." />
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary
        fallback={
          <ErrorFallback 
            title="Failed to Load Meals" 
            message="There was a problem loading your menu data. Please try again later."
          />
        }
      >
        <div>
          <MealTable role={role} pagination={res.pagination as Ipagination} categories={categories.data as TResponseCategoryData<{user:TUser}>[]} initialmeals={res.data} />
        </div>
      </ErrorBoundary>

    );
  } catch (error: any) {
    return (
      <ErrorBoundary>
        <div className="p-4 text-red-500">
          {(error && error.message) || "Failed to load data"}
        </div>
      </ErrorBoundary>
    );
  }
};

export default HistoryMeals;
