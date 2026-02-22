import z from "zod"
  const usersData = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    email: z.string().optional(),
    password: z.string().min(8).optional(),
    phone: z.string().min(10).max(15).optional()
  }).strict()

export type UsersData = z.infer<typeof usersData>




export type UserRole = "Provider" | "Admin" | "Customer"

export type UserStatus = "activate" | "deactivate"

export interface ProviderProfile {
  id: string
  userId: string
  restaurantName: string
  address: string
  description: string
  image: string | null
  createdAt: string
  updatedAt: string
}
export interface ProviderUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string
  phone: string | null
  role: UserRole
  status: UserStatus
  isActive: boolean
  createdAt: string
  updatedAt: string
  provider: ProviderProfile
}