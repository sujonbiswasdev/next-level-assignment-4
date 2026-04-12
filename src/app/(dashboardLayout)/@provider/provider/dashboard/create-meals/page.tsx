import { getCategory } from "@/actions/category";
import { MealsForm } from "@/components/modules/meals/create-meals";
import { TResponseCategoryData } from "@/types/category";
import { IGetMealData } from "@/types/meals.type";
import { TUser } from "@/types/user.type";

export default async function MealsPage() {
  const res=await getCategory()
  return (
    <div>
      <MealsForm data={res?.data as TResponseCategoryData<{meals:IGetMealData,user:TUser}>[]}/>
    </div>
  )
}
