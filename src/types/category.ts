import { IGetMealData } from "./meals.type";

// category create
export interface ICreateCategory {
  name: string;
  image: string; 
}

export interface IUpdateCategory {
  name?: string;
  image?: string; 
}



export type TGetCategory = {
  id:string,
  name: string
  image: string
  adminId:string
  createdAt:string
}
export type TResponseCategoryData<T = unknown> = TGetCategory & T;