import { revalidateTag } from 'next/cache';
import { env } from "@/env"
import { UsersData } from "@/types/user/user"
import { cookies } from "next/headers"

const api_url=env.API_URL

export const userService={
    updateUser:async(updateUser:UsersData)=>{  
  try {
    const cookieStore = await cookies()
    const res = await fetch(`${api_url}/api/users/profile/update`, {
      method: "PUT",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(updateUser),
    });
    revalidateTag("userdata",'page')
    const data = await res.json();
    if (!res.ok) {
       return { success: false, error: data.result?.message || "An error occurred while updating" }
    }
    return { success: true, message: "user updated successfully", data };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "An error occurred while updating" };
  }
    },
     DeleteUserown: async () => {
            try {
                const cookieStore = await cookies()
                const res = await fetch(`${api_url}/api/users/profile/own`, {
                    method:"DELETE",
                    credentials: "include",
                    headers: {
                        Cookie: cookieStore.toString()
                    },
                    next:{
                        tags:['userdata']
                    }
                })
                const body = await res.json()
             if(!res.ok){
                   return { success: false, error: body.error || "user delete failed" }
             }
             cookieStore.delete("__Secure-assignment-4.session_tokens")
             return {data:body,message:"user deleted successfully"}
            } catch (error: any) {
                return {
                    data: null,
                    error: error.message
                }
            }
    
        },
    

}