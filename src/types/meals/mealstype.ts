export const cuisines = [
  "BANGLEDESHI",
  "ITALIAN",
  "CHINESE",
  "INDIAN",
  "MEXICAN",
  "THAI",
  "JAPANESE",
  "FRENCH",
  "MEDITERRANEAN",
  "AMERICAN",
  "MIDDLE_EASTERN"
] as const;

export const dietaryPreferences = [
  "HALAL",
  "VEGAN",
  "VEGETARIAN",
  "ANY",
  "GLUTEN_FREE",
  "KETO",
  "PALEO",
  "DAIRY_FREE",
  "NUT_FREE",
  "LOW_SUGAR"
] as const;


export type Cuisine = typeof cuisines[number];
export type DietaryPreference = typeof dietaryPreferences[number];


export interface ReviewCustomer {
  id: string;
  name: string | null;
  image: string | null;
  email: string;
}

export interface MealReview {
  customer: ReviewCustomer;
  comment: string;
  rating: number;
}


export interface MealProvider {
  id: string;
  userId: string;
  restaurantName: string;
  address: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface MealData {
  id: string;
  meals_name: string;
  description: string | null;
  image: string | null;
  price: number;
  isAvailable: boolean;
  dietaryPreference: DietaryPreference;
  providerId: string;
  category_name: string;
  cuisine: Cuisine;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  provider: MealProvider;
  reviews: MealReview[];
}


export type UpdateMealsData = {
  meals_name?: string;
  description?: string;
  image?: string;
  price?: number;
  isAvailable?: boolean;
  dietaryPreference?: DietaryPreference;
  category_name?: string;
  cuisine?: Cuisine;
};