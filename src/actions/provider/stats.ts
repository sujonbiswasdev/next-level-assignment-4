"use server"

import { providerServiceStats } from "@/services/provider/stats"


export const getrevenueStats=async()=>{
  return await providerServiceStats.getrenuestats()
}

export const getprovidermealsStats=async()=>{
  return await providerServiceStats.getProvidermealsStats()
}

export const getownorderstats=async()=>{
  return await providerServiceStats.getownorderstats()
}