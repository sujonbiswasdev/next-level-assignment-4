import { allowedDomains } from "@/lib/domain";
import { cuisines, dietaryPreferences } from "@/types/meals.type";
import z from "zod";

export const CreateMealData = z.object({
  meals_name: z.string().min(1, "meals name is required"),
  description: z.string().min(5, "description atleast 5 character"),
  deliverycharge: z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === "") return 0;
      return Number(val);
    },
    z
      .number()
      .refine(
        (val) => val === 0 || val === 120,
        { message: "deliverycharge must be either 0 or 120 Taka." }
      )
      .optional()
  ),
  image: z
    .string()
    .min(1, "Image is required")
    .url("Invalid image URL")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return allowedDomains.includes(parsed.hostname);
        } catch {
          return false;
        }
      },
      {
        message: "Only Cloudinary and Pexels images allowed",
      },
    ),
  price: z
  .preprocess((val) => {
    if (val === "" || val === null) return 0;
    return Number(val);
  }, z
    .number()
    .min(60, { message: "Fee must be at least 60 Taka." })
    .max(6000, { message: "Fee cannot exceed 6000 Taka." })
    .optional()
  ),
  isAvailable: z.boolean(),
  dietaryPreference: z.enum(dietaryPreferences),
  category_name: z.string().min(1, "category name is required"),
  cuisine: z.enum(cuisines),
});

// update meals

export const UpdatemealData = z.object({
  meals_name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z
  .preprocess((val) => {
    if (val === "" || val === null) return undefined;
    return Number(val);
  }, z
    .number()
    .min(60, { message: "Fee must be at least 60 Taka." })
    .max(6000, { message: "Fee cannot exceed 6000 Taka." })
    .optional()
  ),
  isAvailable: z.boolean().optional(),
  category_name: z.string().optional(),
  cuisine: z.enum([
      "BANGLEDESHI", "ITALIAN", "CHINESE", "INDIAN", "MEXICAN", 
      "THAI", "JAPANESE", "FRENCH", "MEDITERRANEAN", 
      "AMERICAN", "MIDDLE_EASTERN"
  ]).optional(),
  dietaryPreference: z.enum([
      "HALAL", "VEGAN", "VEGETARIAN", "ANY", "GLUTEN_FREE", 
      "KETO", "PALEO", "DAIRY_FREE", "NUT_FREE", "LOW_SUGAR"
  ]).optional()
});

