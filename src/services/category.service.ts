import { env } from "@/env";
import {ICreateCategory, IUpdateCategory, TGetCategory, TResponseCategoryData } from "@/types/category";
import { IGetMealData } from "@/types/meals.type";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { TUser } from "@/types/user.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
const api_url = env.API_URL

export interface Icategory {
  name?: string,
  image?: string
}
export const CategoriesService = {
  getcategory: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/v1/category`, {
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString()
        },
        next: {
          tags: ['category']
        }
      })
      const data = await res.json()
      const result =data as ApiResponse<TResponseCategoryData<{meals:IGetMealData,user:TUser}>[]>
      if(!result.data){
        const error=data as ApiErrorResponse
        return {success:error.success,message:error.message || "categories retrive failed"}
      }
      return {success:result.success,message:result.message,data:result.data}
    } catch (error) {
      return {message:"something went wrong,please try again"}
    }
  },
  createCategory: async (value: any) => {

    try {
      const cookieStore = await cookies();

      const response = await fetch(`${api_url}/api/v1/admin/category`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString()
        },
        body: JSON.stringify(value)
      })
      revalidateTag('category', 'max')
      const data = await response.json()
        const result =data as ApiResponse<ICreateCategory> 
          if (!result.data) {
            const error=data as ApiErrorResponse
             return { message: error.message || "category create failed" }
          }
          return { success: true, message: "category created successfully", result };

    } catch (error) {
      return {
        success: false,
        message: "something went wrong please try again"
      }

    }

  },
  updateCategory: async (id: string, updateUser: IUpdateCategory) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${api_url}/api/v1/admin/category/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(updateUser),
      });
      revalidateTag('category', 'max')
      const data = await res.json();
      const result = data as ApiResponse<TGetCategory>
      if (!res.ok) {
        const error = data as ApiErrorResponse
        return {success:error.success ,message:error.message || "category data update fail" }
      }
      return { success: result.success, message:result.message ||  "category data update successfully", data };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message || "something went wrong please try again" };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${api_url}/api/v1/admin/category/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      revalidateTag("category", 'max')
      const data = await res.json();
      const result = data as ApiResponse<TGetCategory>
      if (!res.ok) {
        const error =data as ApiErrorResponse
        return { success: error.success, message:error.message || "category data delete fail" }
      }
      return {success:result.success,message:result.message || "category deleted sucessfully",data:result};
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message || "something went wrong please try again" };
    }
  },
  singlecategory: async (id: string) => {
    try {
      const cookieStore = await cookies()
      const res = await fetch(`${api_url}/api/v1/category/${id}`, {
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ['category']
        }
      })
      const data = await res.json();
      const result = data as ApiResponse<TGetCategory>
      if (!res.ok) {
        const error=data as ApiErrorResponse
        return { success: false, message: error.message || "category data retrieve fail" }
      }
      return {success:result.success,message:result.message,data:result};
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message || "something went wrong please try again" };
    }
  },
}