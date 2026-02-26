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
  if (!res.data || res.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  const meals = res?.data?.result?.data || [];
  const pagination = res?.data?.result?.pagination

  return (
    <div>
      <MealTable initialmeals={meals} />
    </div>
  )
}

export default HistoryMeals
