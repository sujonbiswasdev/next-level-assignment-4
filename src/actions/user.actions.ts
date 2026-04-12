"use server"

import { userService } from "@/services/user.service"
import { TUpdateuserbyAdmin, TUpdateUserInput } from "@/types/user.type"

export const updateUser=async(userdata:TUpdateUserInput)=>{
  return await userService.updateUser(userdata)
}

export const deleteuserown=async()=>{
  return await userService.DeleteUserown()
}
export const getAllusers=async(params:any)=>{
  return await userService.getAllusers(params)
}
export const updateuserdata=async(id:string,data:TUpdateuserbyAdmin)=>{
  return await userService.updateuserdata(id,data)
}
export const deleteUser=async(id:string)=>{
  return await userService.DeleteUser(id)
}

