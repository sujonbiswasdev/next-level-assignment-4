'use server'
import { mealsService } from "@/services/meals";
import { MealFormData, UpdateMealsDate } from "@/types/mealsType";
import { updateTag } from "next/cache";

export const createmeals = async (data:MealFormData) => {
  const res = await mealsService.createMeals(data);
  updateTag("mealsPost");
  return res;
};

export const getMeals=async(params?:any,config?:any)=>{
  return await mealsService.getmeals(params,config)
}

export const updateMeal = async (id:string,data:UpdateMealsDate) => {
  const res = await mealsService.updateMeals(id,data);
  updateTag("mealsPost");
  return res;
};