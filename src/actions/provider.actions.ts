"use server"

import { providerService } from "@/services/provider.service"

export const getProviderwithMeals=async(id:string)=>{
    return await providerService.getprovidermeals(id)
  }
  
  export const getAlluserProvider=async(params:any)=>{
    return await providerService.getAllProviderUser(params)
  }
  export const getTopProviderUser = async () => {
    return await providerService.getTopProviderUser()
  }