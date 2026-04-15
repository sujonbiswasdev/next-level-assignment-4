'use server'
import { IMealStatus, mealsService, ServiceOptionds } from "@/services/meals.service";
import {  TCreateMealsData, TUpdateMealsData, UpdateMealsData } from "@/types/meals.type";
import { updateTag } from "next/cache";

export const createmeals = async (data:TCreateMealsData) => {
  const res = await mealsService.createMeals(data);
  updateTag("mealsPost");
  return res;
};

export const getAllMeals=async(params?:any,config?:any)=>{
  return await mealsService.getAllmeals(params,config)
}

export const getmealsown = async (params?: any) => {
  return await mealsService.getmealsown(params);
};

export const getmealsforadmin=async(params?: Record<string, any>, options?: ServiceOptionds)=>{
  return await mealsService.getmealsforadmin(params)
}


export const updateMeal = async (id:string,data:TUpdateMealsData) => {
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
  updateTag("meal");
  return res;
};