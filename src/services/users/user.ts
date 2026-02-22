import { env } from "@/env"
import { UsersData } from "@/types/user/user"
import { cookies } from "next/headers"

const api_url=env.API_URL

export const userService={
    updateUser:async(updateUser:UsersData)=>{  
  try {
    const cookieStore = await cookies()
    const res = await fetch(`${api_url}/users/profile/update`, {
      method: "PUT",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(updateUser),
    });
    const data = await res.json();
    if (!res.ok) {
       return { success: false, error: data.result?.message || "An error occurred while updating the meal" }
    }
    return { success: true, message: "user updated successfully", data };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "An error occurred while updating the meal" };
  }
    }

}