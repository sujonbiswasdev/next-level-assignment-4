export type MealFormData ={
  meals_name: string;
  description: string;
   image: string;
  price: number;
  isAvailable: boolean;
  dietaryPreference: "HALAL" | "VEGAN" | "VEGETARIAN" | "ANY"; 
  category_name: string;
  cuisine: string;
}