import { getmealsown } from "@/actions/meals.action"
import MealTable from "@/components/modules/meals/MealsTable"
import { IGetMealData } from "@/types/meals.type"
interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const HistoryMeals = async () => {
  const res = await getmealsown();
  if (!res.success || !res.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load data
      </div>
    );
  }
  const meals = res.data as IGetMealData[];
  // const pagination = res?.data?.result?.pagination

  return (
    <div>
      <MealTable initialmeals={meals} />
    </div>
  )
}

export default HistoryMeals
