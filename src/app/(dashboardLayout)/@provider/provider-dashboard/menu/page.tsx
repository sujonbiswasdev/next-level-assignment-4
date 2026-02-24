import { getMeals, getmealsown } from "@/actions/blog.meals"
import MealTable from "@/components/meals/MealsTable"
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const HistoryMeals = async () => {
      const res = await getmealsown();
      const meals = res?.data?.result?.data || [];
      const pagination=res?.data?.result?.pagination
  
  return (
    <div>
        <MealTable initialmeals={meals}/>
    </div>
  )
}

export default HistoryMeals
