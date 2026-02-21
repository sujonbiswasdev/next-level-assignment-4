export type MealFormData ={
  id?:string,
  meals_name: string;
  description: string;
   image: string;
  price: number;
  isAvailable: boolean;
  dietaryPreference: "HALAL" | "VEGAN" | "VEGETARIAN" | "ANY"; 
  category_name: string;
  cuisine: string;
}

export type UpdateMealsDate ={
  meals_name?: string;
  description?: string;
  image?: string;
  price?: number;
  isAvailable?: boolean;
  dietaryPreference?: "HALAL" | "VEGAN" | "VEGETARIAN" | "ANY"; 
  category_name?: string;
  cuisine?: string;
}