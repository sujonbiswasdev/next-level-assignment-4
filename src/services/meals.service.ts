import { env } from "@/env";
import { cookies } from "next/headers";
import { safeData } from "@/lib/safeResponsive";
import {
  ICreateMealsData,
  IGetAllmeals,
  IGetMealData,
  IUpdateMealsData
} from "@/types/meals.type";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { success } from "zod";
const api_url = env.API_URL;

interface ServiceOptionds {
  cache?: RequestCache;
  revalidate?: number;
}
export interface GetMealsParams {
  search?: string;
}
export interface IMealStatus{
  status:string
}

export const mealsService = {
  createMeals: async (mealsdata: ICreateMealsData) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${api_url}/api/provider/meal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(mealsdata),
      });

      const data = await res.json();

      const result = data as ApiResponse<ICreateMealsData>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "meal created failed",
        };
      }
      return {
        success: result.success,
        message: result.message || "meal created successfully",
        data: result.data,
      };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getmeals: async (params?: any, options?: ServiceOptionds) => {
    try {
      const url = new URL(`${api_url}/api/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      // const config: RequestInit = {};
      // if (options?.cache) {
      //   config.cache = options.cache;
      // }

      // if (options?.revalidate) {
      //   config.next = { revalidate: options.revalidate };
      // }
      // config.next = { ...config.next, revalidate:60};

      const res = await fetch(url.toString(), {next:{revalidate:60}});

      const data = await res.json();
      const result = data as ApiResponse<IGetAllmeals>;
      if (!res.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all meals failed",
        };
      }
      return {
        success: result.success,
        message: result.message || "retrieve all meals successfully",
        data: result.data,
      };
    } catch (error) {
      return { message: "something went wrong please try again" };
    }
  },
  getmealsown: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/provider/meals/own`, {
        credentials: "include",
        next: { tags: ["mealsPost"] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      const result =data as ApiResponse<IGetMealData[]>
      if(!res.ok){
        const error =data as ApiErrorResponse
        return {success:error.success,message:error.message || "retrieve own meals failed"}
      }
      return result;
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  MealStatusUpdate: async (id: string, mealsdata: IMealStatus) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/admin/meal/${id}`, {
        method:"PUT",
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({mealsdata}),
      });
      const data = await res.json();
       const result =data as ApiResponse<IGetMealData>
      if(!res.ok){
        const error =data as ApiErrorResponse
        return {success:error.success,message:error.message || "meals status update failed"}
      }
      return result;
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getmealsbyid: async (id: string) => {
    try {
      const res = await fetch(`${api_url}/api/meal/${id}`);
      const body = await res.json();
      const result = body as ApiResponse<IGetMealData>
      if(!res.ok){
        const error=body as ApiErrorResponse
        return {success:error.success, message:error.message || "retrieve single meal failed"}
      }
      return {success:result.success,message:result.message || "retrieve signle meal successfully",result}
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  },

  handleDelete: async (id: string) => {
    try {
       const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/provider/meal/${id}`, {
        method: "DELETE",
        credentials:"include",
        headers:{
          "Content-Type": "application/json",
          Cookie:cookieStore.toString()
        }
      });
      const data = await res.json();
      const result = data as ApiResponse<IGetMealData>
      if (!res.ok) {
        const error =data as ApiErrorResponse
        return {success:error.success,message:error.message}
      }
      return {success:result.success,message:result.message,data:result.data};
    } catch (error: any) {
      return {success:false,message:"something went wrong please try again"}
    }
  },
  updateMeals: async (id: string, mealsdata: IUpdateMealsData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/provider/meal/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(mealsdata),
      });
      const data = await res.json();
      const result = data as ApiResponse<IGetMealData>
      if (!res.ok) {
        const error =data as ApiErrorResponse
        return {
          success: error.success,
          message:error.message || "meal update failed",
        };
      }
      return { success: result.success, message:result.message|| "Meal updated successfully", data:result };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "An error occurred while updating the meal",
      };
    }
  },
  getmealsforadmin: async (params?: any) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${api_url}/api/admin/meals`);
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
        next: {
          tags: ["mealsPost"],
        },
      });
      const data = await res.json();
       const result = data as ApiResponse<IGetMealData[]>
      if (!res.ok) {
        const error =data as ApiErrorResponse
        return {success:error.success,message:error.message ||"retrieve admin meal data failed"}
      }
      return {success:result.success,message:result.message,data:result.data};
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
        message: "someting went wrong please try again",
      };
    }
  },
};
