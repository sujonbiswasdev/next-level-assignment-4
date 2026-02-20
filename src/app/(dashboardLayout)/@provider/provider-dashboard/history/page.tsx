import { getMeals } from "@/actions/blog.meals"
import MealTable from "@/components/meals/MealsTable"
import { getcategory } from "@/services/category"
import { mealsService } from "@/services/meals"
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const HistoryMeals = async ({searchParams}:PageProps) => {
     const serch=await searchParams
 
      // 🔹 Server fetch
      const res = await getMeals(serch);
      const meals = res?.data?.result?.data || [];
      const pagination=res?.data?.result?.pagination
  
  return (
    <div>
        <MealTable initialmeals={meals}/>
    </div>
  )
}

export default HistoryMeals
