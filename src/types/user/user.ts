import z from "zod"
import { Cuisine, DietaryPreference, MealData } from "../meals/mealstype"
const usersData = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(10).max(15).optional()
}).strict()

export type UsersData = z.infer<typeof usersData>


export const Updateuserschema = z.object({
  role: z.string().optional(),
  status: z.string().optional(),
  email: z.string()
}).strict()

export type Updateuserdata = z.infer<typeof Updateuserschema>


export type UserRole = "Provider" | "Admin" | "Customer"

export type UserStatus = "activate" | "deactivate"

export interface ProviderProfile {
  id: string
  userId: string
  restaurantName: string
  address: string
  description: string
  image: string | null
  totalReview: number,
  averageRating: number
  user: User
  providerRating?: {
    averageRating?: number
    totalReview?: number
  };
  meals: MealData[]
  createdAt: string
  updatedAt: string
}
export interface User {
  user: any
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string
  bgimage?: string
  phone: string | null
  role: UserRole
  status: UserStatus
  isActive: boolean
  createdAt: string
  updatedAt: string
  provider: ProviderProfile
  meals: MealData[]
}



const allowedDomains = [
  "res.cloudinary.com",
  "images.pexels.com",
];
export const updateUserSchema = z.object({
  name: z.string().optional(),
  image: z
    .string()
    .url("Invalid image URL")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return allowedDomains.includes(parsed.hostname);
      } catch {
        return false;
      }
    }, {
      message: "Only Cloudinary and Pexels images allowed",
    }).optional(),
  bgimage: z
    .string()
    .url("Invalid image URL")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return allowedDomains.includes(parsed.hostname);
      } catch {
        return false;
      }
    }, {
      message: "Only Cloudinary and Pexels images allowed",
    }).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(10).max(15).optional(),
  isActive: z.boolean().optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;