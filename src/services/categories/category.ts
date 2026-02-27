import { env } from "@/env";
import { safeData } from "@/lib/safeResponsive";
import { Category } from "@/types/category";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const api_url = env.API_URL

export interface Icategory{
    name?:string,
    image?:string
}
export const CategoriesService = {
    getcategory: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${api_url}/admin/category`, {
                credentials: "include",
                headers: {
                    Cookie: cookieStore.toString()
                },
                next: {
                    tags: ['categorydata']
                }

            })
            const body = await res.json()
            return safeData(body,[])
        } catch (error) {
            console.log(error) 
        }
    },
    createCategory: async (value: any) => {

        try {
            const cookieStore = await cookies();

            const response = await fetch('http://localhost:5000/api/admin/category', {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json',Cookie: cookieStore.toString() },
                body: JSON.stringify(value)
            })
            revalidateTag('categorydata','page')
            const body = await response.json()
            if(!body){
                return{
                    success:false,
                    message:"category create failed"
                }
            }
            return {
                success:true,
                message:"category created successfully"
            }
            
        } catch (error) {
            return {
                success:false,
                message:"something went wrong please try again"
            }

        }

    },
    updateCategory:async(id:string,updateUser:Icategory)=>{  
      try {
        const cookieStore = await cookies()
        const res = await fetch(`${api_url}/admin/category/${id}`, {
          method: "PUT",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(updateUser),
        });
        revalidateTag("categorydata",'page')
        const data = await res.json();
        if (!res.ok) {
           return { success: false, error: data.result?.message || "category data update fail" }
        }
        return { success: true, message: "category data update successfully", data };
      } catch (error: any) {
        console.error(error);
        return { success: false, error: error.message || "something went wrong please try again" };
      }
        },

   deleteCategory:async(id:string)=>{  
      try {
        const cookieStore = await cookies()
        const res = await fetch(`${api_url}/admin/category/${id}`, {
          method: "DELETE",
          credentials:"include",
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
        revalidateTag("categorydata",'page')
        const data = await res.json();
        if (!res.ok) {
           return { success: false, error: data.result?.message || "category data delete fail" }
        }
        return { success: true, message: "category data delete successfully", data };
      } catch (error: any) {
        console.error(error);
        return { success: false, error: error.message || "something went wrong please try again" };
      }
        },
singlecategory:async(id:string)=>{  
      try {
        const cookieStore = await cookies()
        const res = await fetch(`${api_url}/admin/category/${id}`, {
          credentials:"include",
          headers: {
            Cookie: cookieStore.toString(),
          },
            next: {
                    tags: ['categorydata']
                }
        })
        const data = await res.json();
        if (!res.ok) {
           return { success: false, error: data.result?.message || "category data retrieve fail" }
        }
        return safeData(data,{});
      } catch (error: any) {
        console.error(error);
        return { success: false, error: error.message || "something went wrong please try again" };
      }
        },
}