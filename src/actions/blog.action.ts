'use server'
import { mealsService } from "@/services/meals";
import { MealFormData } from "@/types/mealsType";
import { updateTag } from "next/cache";

export const createmeals = async (data:MealFormData) => {
  const res = await mealsService.createMeals(data);
  updateTag("mealsPost");
  return res;
};