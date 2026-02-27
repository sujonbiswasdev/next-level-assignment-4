export type Category = {
  id:string,
  name: string
  image: string
  adminId:string
  createdAt:string
  meals: any[]
  user: {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    bgimage: string
    phone: string | null
    role: string
    status: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}