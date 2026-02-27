'use client'
import { MealStatusUpdate } from '@/actions/blog.meals';
import { UpdateMealsData } from '@/types/meals/mealstype';
import React from 'react'
import { toast } from 'react-toastify';

const MealStatus = ({mealid}:{mealid:string}) => {
     const [mealData, setMealData] = React.useState<{status:string}>({status:""});
      const handleSubmit = async (e: React.FormEvent) => {
        if(mealData===null || mealData.status==''){
            toast.error("plase enter a valid status")
           return
        }
        const toastid=toast.loading("updating status........")
        e.preventDefault();
        const data = await MealStatusUpdate(mealid, mealData.status)
        if (!data) {
            toast.dismiss(toastid)
          return toast.error("Failed to update status meal");
        } else {
            toast.dismiss(toastid)
          toast.success("Meal status updated successfully");
          setMealData({'status':""})
        }
      };
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-10 to-green-50 p-6">
      <form onSubmit={handleSubmit} className={` w-full max-w-xl shadow-2xl rounded-3xl p-8 md:p-12 space-y-6`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Update Meal status
        </h2>

          <div className="flex flex-col space-y-2">
            <label htmlFor="mealName" className="font-medium ml-2 ">status </label>
            <input
              type="text"
              placeholder="please enter your status (PENDING,APPROVED,REJECTED)"
              value={mealData?.status ?? ""}
              onChange={(e) => setMealData({ status: e.target.value })}
              className="w-full border-2 border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"

            />
    
        </div>
       

        <button

          type="submit"
          className={`bg-black text-white p-2 w-full`}
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default MealStatus
