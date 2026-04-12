import { env } from "@/env"
import { IGetMealData } from "@/types/meals.type";
import { IProviderInfo, TResponseproviderData } from "@/types/provider.type";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { TUser } from "@/types/user.type";

const api_url=env.API_URL


export const providerService = {
  getprovidermeals: async (id: string) => {
    try {
      const response = await fetch(
        `${api_url}/api/v1/providers/${id}`
      );

      const body = await response.json();
      const result = body as ApiResponse<any>
      if(!response.ok){
        const error=body as ApiErrorResponse
        return {success:error.success,message:error.message || "retrieve provider profile with meal Failed"}
      }
      return {success:result.success,message:result.message || "retrieve provider profile with meal successfully",data:result.data
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
  getAllProviderUser: async (params?: any, options?: RequestInit & { revalidate?: number }) => {
    try {
      const url = new URL(`${api_url}/api/v1/providers`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        (config as any).next = { revalidate: options.revalidate };
      }
      (config as any).next = { ...((config as any).next), revalidate: 10, tags: ["provider","providers"] };

      const response = await fetch(url.toString(), config);

      const data = await response.json();
      const result = data.data as TResponseproviderData<{user:TUser, meals:IGetMealData, rating:{totalReview:number, averageRating:number}}>[]

      if (!response.ok) {
        const error = data as ApiErrorResponse;
        return {
          success: error.success,
          message: error.message || "retrieve all provider user failed",
        };
      }

      return {
        success: data.success,
        message: data.message || "retrieve all provider users successfully",
        data: result,
        pagination: data.data?.pagination
      };
    } catch (error) {
      return { message: "something went wrong please try again" };
    }
  },

  getTopProviderUser: async () => {
    try {
      const response = await fetch(`${api_url}/api/v1/top-providers`);

      const data = await response.json();

      if (!response.ok) {
        const error=data as ApiErrorResponse
        return {success:error.success,message:error.message || "retrieve top provider user failed"}
      }

      return {success:data.success,message:data.message,data}
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

};