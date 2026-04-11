import { env } from "@/env"
import { IProviderInfo } from "@/types/provider.type";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";

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
  getAllProviderUser: async () => {
    try {
      const response = await fetch(`${api_url}/api/providers`);

      const data = await response.json();
      const result = data as ApiResponse<IProviderInfo[]>

      if (!response.ok) {
        const error=data as ApiErrorResponse
        return {success:error.success,message:error.message || "retrieve all provider user failed"}
      }

      return result
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};