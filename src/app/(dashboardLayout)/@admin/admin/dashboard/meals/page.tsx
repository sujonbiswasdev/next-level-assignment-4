import { getCategory } from "@/actions/category";
import { getmealsforadmin } from "@/actions/meals.action";
import MealTable from "@/components/modules/meals/MealsTable";
import { getSession } from "@/services/auth.service";
import { TGetCategory, TResponseCategoryData } from "@/types/category";
import { TResponseMeals } from "@/types/meals.type";
import { Ipagination } from "@/types/pagination.type";
import { IProviderInfo } from "@/types/provider.type";
import { IgetReviewData } from "@/types/reviews.type";
import { TUser } from "@/types/user.type";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";

const AdminMealspage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const userinfo = await getSession();
  const search = await searchParams;
  let res, categories;
  
  try {
    res = await getmealsforadmin(search);
    categories = await getCategory();
  } catch (error) {
    return (
      <ErrorFallback
        title="Unable to Retrieve Meals"
        message="Sorry, there was a problem fetching the meals for administration. Please refresh the page or try again later. If the issue continues, contact support."
      />
    );
  }

  if (!res || !res.success) {
    return (
      <ErrorFallback
        title="Meals Data Not Found"
        message="We could not load the meal data at this moment. Please check your connection and try again. If the issue persists, please reach out to an administrator."
      />
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          title="Error Loading Meals"
          message="An unexpected error occurred while displaying the meal list. Please try again later or contact support if this continues."
        />
      }
    >
      <div>
        <MealTable
          role={userinfo?.data.role as string}
          pagination={res.pagination as Ipagination}
          categories={categories?.data as TResponseCategoryData<{ user: TUser }>[]} 
          initialmeals={
            res.data as TResponseMeals<{
              category: TGetCategory;
              provider: IProviderInfo;
              reviews: IgetReviewData;
            }>[]
          }
        />
      </div>
    </ErrorBoundary>
  );
};

export default AdminMealspage;
