import { env } from "@/env"
import { safeData } from "@/lib/safeResponsive"
import { Updateuserdata, UsersData } from "@/types/user/user"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const api_url = env.API_URL


export const AdminService = {
    updateuserdata: async (id:string,updateUser: Updateuserdata) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${api_url}/admin/profile/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(updateUser),
            });
            const data = await res.json();
            if (!res.ok) {
                return { success: false, error: data.result?.message}
            }
            return { success: true, message: "user updated successfully", data };
        } catch (error: any) {
            console.error(error);
            return { success: false, error: error.message || "something went wrong please  try again" };
        }
    },
     userrolechange: async (id:string,updateUser: UsersData) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${api_url}/admin/profile/${id}/role`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(updateUser),
            });
            revalidateTag('userdata','page')
            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error.customeMessage || "user role update failed" }
            }
            return { success: true, message: "user role update successfully", data };
        } catch (error: any) {
            console.error(error);
            return { success: false, error: error.message || "something went wrong please try again" };
        }
    },
    getAllusers: async (params?: any) => {
        try {
            const cookieStore = await cookies()
            const url = new URL(`${api_url}/admin/users`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, String(value));
                    }
                });
            }
            const res = await fetch(url.toString(), {
                credentials: "include",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                next:{
                    tags:['userdata']
                }
            });
            const data = await res.json();
            if (!res.ok) {
                return {
                    data: null,
                    message: "user retrieve failed",
                    error: data.error
                }
            }

            return safeData(data,[])
        } catch (error: any) {
            return { data: null, error: error.message, message: "someting went wrong please try again" };

        }

    },
    getuserbyid: async (id: string) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${api_url}/user/profile/${id}`, {
                credentials: "include",
                headers: {
                    Cookie: cookieStore.toString()
                },
                next:{
                    tags:['userdata']
                }
            })
            const body = await res.json()
            return {data:body,error: null}
        } catch (error: any) {
            return {
                data: null,
                error: error.message
            }
        }

    },
    DeleteUser: async (id: string) => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${api_url}/users/profile/${id}`, {
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
         return {data:body,message:"user deleted successfully"}
        } catch (error: any) {
            return {
                data: null,
                error: error.message
            }
        }

    },



}