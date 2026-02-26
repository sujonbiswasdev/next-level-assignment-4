'use server'
import { providerService } from "@/services/provider"

export const getProviderwithMeals=async(id:string)=>{
  return await providerService.getprovidermeals(id)
}