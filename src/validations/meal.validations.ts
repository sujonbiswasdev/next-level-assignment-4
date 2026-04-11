import { allowedDomains } from "@/lib/domain";
import { cuisines, dietaryPreferences } from "@/types/meals.type";
import z from "zod";

export const CreateMealData = z.object({
  meals_name: z.string().min(1, "meals name is required"),
  description: z.string().min(5, "description atleast 5 character"),
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
  price: z.int().min(1, "price is required").max(1000, "max price only 1000"),
  isAvailable: z.boolean(),
  dietaryPreference: z.enum(dietaryPreferences),
  category_name: z.string().min(1, "category name is required"),
  cuisine: z.enum(cuisines),
});

// update meals

export const UpdatemealData = z.object({
  meals_name: z.string().optional(),
  description: z.string().optional(),
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
    )
    .optional(),
  price: z.number().optional(),
  isAvailable: z.boolean().optional(),
  category_name: z.string().optional(),
  cuisine: z
    .enum([
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
      "MIDDLE_EASTERN",
    ])
    .optional(),
  dietaryPreference: z
    .enum([
      "HALAL",
      "VEGAN",
      "VEGETARIAN",
      "ANY",
      "GLUTEN_FREE",
      "KETO",
      "PALEO",
      "DAIRY_FREE",
      "NUT_FREE",
      "LOW_SUGAR",
    ])
    .optional(),
});
