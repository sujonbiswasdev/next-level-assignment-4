import UpdateMeal from '@/components/meals/updateMeals';
const UpdateMeals = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params;
  return (
    <div>
      <UpdateMeal mealId={id}/>
    </div>
  )
}

export default UpdateMeals
