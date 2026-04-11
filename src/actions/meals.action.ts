'use server'
import { IMealStatus, mealsService } from "@/services/meals.service";
import {  ICreateMealsData, IUpdateMealsData, UpdateMealsData } from "@/types/meals.type";
import { updateTag } from "next/cache";

export const createmeals = async (data:ICreateMealsData) => {
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


export const updateMeal = async (id:string,data:IUpdateMealsData) => {
  const res = await mealsService.updateMeals(id,data);
  updateTag("mealsPost");
  return res;
};

export const DeleteMeals = async (id:string) => {
  const res = await mealsService.handleDelete(id);
  updateTag("mealsPost");
  return res;
};
export const MealStatusUpdate = async (id:string,data:IMealStatus) => {
  const res = await mealsService.MealStatusUpdate(id,data);
  updateTag("mealsPost");
  return res;
};