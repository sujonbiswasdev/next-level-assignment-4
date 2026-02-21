import Updatemealse from '@/components/meals/updateMeals';
import React from 'react'

const UpdateMeals = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params;


  return (
    <div>
      <Updatemealse mealId={id}/>
    </div>
  )
}

export default UpdateMeals
