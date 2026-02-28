import SignleMealByid from "@/components/meals/singleMeal";
import { mealsService } from "@/services/meals";
import { getSession } from "@/services/service";
import { MealData } from "@/types/meals/mealstype";

export default async function SingleMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await mealsService.getmealsbyid(id);
  if (!res.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load meal
      </div>
    );
  }
  return (
    <>
      <div className="p-4">
        <SignleMealByid meal={res.data as MealData}/>
      </div>
    </>
  );
}