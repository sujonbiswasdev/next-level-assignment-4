"use server"

import { userService } from "@/services/users/user"
import { UsersData } from "@/types/user/user"


export const updateUser=async(userdata:UsersData)=>{
  return await userService.updateUser(userdata)
}