'use server'
import { providerService } from "@/services/provider/provider"

export const getProviderwithMeals=async(id:string)=>{
  return await providerService.getprovidermeals(id)
}

export const getAlluserProvider=async()=>{
  return await providerService.getAllProviderUser()
}