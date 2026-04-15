import { getCategory } from "@/actions/category"
import { getAllMeals, getmealsforadmin } from "@/actions/meals.action"
import AdminMealsTable from "@/components/modules/meals/adminmealsTable"
import MealTable from "@/components/modules/meals/MealsTable"
import { getSession } from "@/services/auth.service"
import { TGetCategory, TResponseCategoryData } from "@/types/category"
import { IGetMealData, TResponseMeals } from "@/types/meals.type"
import { Ipagination } from "@/types/pagination.type"
import { IProviderInfo, TResponseproviderData } from "@/types/provider.type"
import { IgetReviewData } from "@/types/reviews.type"
import { TUser } from "@/types/user.type"
const AdminMealspage = async ({
  searchParams,
}: {
  searchParams:Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const userinfo=await getSession()
  const search = await searchParams
  const res = await getmealsforadmin(search);
  const categories=await getCategory()
  if (!res || !res.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <MealTable role={userinfo?.data.role as string} pagination={res.pagination as Ipagination} categories={categories?.data as TResponseCategoryData<{ user: TUser; }>[]} initialmeals={res.data as TResponseMeals<{ category: TGetCategory; provider: IProviderInfo; reviews: IgetReviewData; }>[]} />
    </div>
  )
}

export default AdminMealspage
