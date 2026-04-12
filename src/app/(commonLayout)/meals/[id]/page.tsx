import { mealsService } from "@/services/meals.service";
import { getSession } from "@/services/auth.service";
import { IGetMealData, TResponseMeals } from "@/types/meals.type";
import { TUser } from "@/types/user.type";
import SignleMealByid from "@/components/modules/meals/singleMeal";
import { TGetCategory } from "@/types/category";
import { IProviderInfo } from "@/types/provider.type";
import { IgetReviewData } from "@/types/reviews.type";

export default async function SingleMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await mealsService.getmealsbyid(id);
  const userinfo=await getSession()
  if (!res.success || res.error || !res.result?.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load meal
      </div>
    );
  }
  return (
    <>
      <div className="p-4">
        <SignleMealByid meal={res.result.data as TResponseMeals<{category:TGetCategory,provider:IProviderInfo,reviews:IgetReviewData[],providerRating:any}>} userinfo ={userinfo?.data as TUser}/>
      </div>
    </>
  );
}