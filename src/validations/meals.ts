import { z } from "zod";

export const mealSchema = z.object({
  meals_name: z.string(),
  description: z.string().max(1000).optional().nullable(),
  price: z.number().int().positive("Price must be positive"),
  isAvailable: z.boolean().optional(),
  dietaryPreference: z.enum(["HALAL", "VEGAN", "VEGETARIAN", "GLUTEN_FREE", "KETO"]),
  providerId: z.string().uuid("Invalid provider ID"),
  category_name: z.string().min(1, "Category is required"),
  cuisine: z.string().min(1, "Cuisine is required"),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
});