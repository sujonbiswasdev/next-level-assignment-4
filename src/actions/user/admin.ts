"use server"
import { AdminService } from "@/services/users/admin"

export const getAllusers=async(params:any)=>{
  return await AdminService.getAllusers(params)
}
export const updateuserdata=async(id:string,data:any)=>{
  return await AdminService.updateuserdata(id,data)
}
export const deleteUser=async(id:string)=>{
  return await AdminService.DeleteUser(id)
}