import MealStatus from '@/components/meals/mealstatusupdate';
import UpdateMeal from '@/components/meals/updateMeals';
const MealStatusUpdate = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    return (
      <div className="p-4 text-red-500">
        Failed to load meals
      </div>
    );
  }
  return (
    <div>
      <MealStatus mealid={id} />
    </div>
  )
}

export default MealStatusUpdate