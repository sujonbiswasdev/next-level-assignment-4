'use server'
import { CategoriesService, Icategory } from "@/services/categories/category";

export const createCategory = async (data: any) => {
  try {
    const res = await CategoriesService.createCategory(data);
    return res;
  } catch (error) {
    console.error("Failed to create category:", error);
    return null; 
  }
}

export const getCategory = async () => {
  try {
    const res = await CategoriesService.getcategory();
    return res;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return null;
  }
}

export const updatecategory = async (id:string,data:Icategory) => {
    const res = await CategoriesService.updateCategory(id,data);
    return res;
 
}

export const deleteCategory = async (id:string) => {
    const res = await CategoriesService.deleteCategory(id);
    return res;
 
}

export const singlecategory = async (id:string) => {
    const res = await CategoriesService.singlecategory(id);
    return res;
 
}