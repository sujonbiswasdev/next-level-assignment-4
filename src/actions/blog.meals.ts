'use server'
import { mealsService } from "@/services/meals";
import { MealData, UpdateMealsData } from "@/types/meals/mealstype";
import { updateTag } from "next/cache";

export const createmeals = async (data:MealData) => {
  const res = await mealsService.createMeals(data);
  updateTag("mealsPost");
  return res;
};

export const getMeals=async(params?:any,config?:any)=>{
  return await mealsService.getmeals(params,config)
}

export const getmealsown=async()=>{
  return await mealsService.getmealsown()
}

export const getmealsforadmin=async(params:any)=>{
  return await mealsService.getmealsforadmin(params)
}


export const updateMeal = async (id:string,data:UpdateMealsData) => {
  const res = await mealsService.updateMeals(id,data);
  updateTag("mealsPost");
  return res;
};

export const MealStatusUpdate = async (id:string,data:string) => {
  const res = await mealsService.MealStatusUpdate(id,data);
  updateTag("mealsPost");
  return res;
};