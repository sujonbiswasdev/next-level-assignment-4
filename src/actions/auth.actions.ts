"use server"

import { loginUser, Logout } from "@/services/auth.service"
import { Ilogin } from "@/types/auth.type"

export const userLogin=async(logindata:Ilogin)=>{
  return await loginUser(logindata)
}
export const userLogout=async()=>{
  return await Logout()
}
