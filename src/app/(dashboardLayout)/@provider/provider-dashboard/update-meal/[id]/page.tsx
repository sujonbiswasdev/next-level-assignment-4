import UpdateMeal from '@/components/meals/updateMeals';
const UpdateMeals = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <UpdateMeal mealId={id} />
    </div>
  )
}

export default UpdateMeals
