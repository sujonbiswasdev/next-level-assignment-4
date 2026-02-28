import { env } from "@/env";
import { safeData } from "@/lib/safeResponsive";
import { cookies } from "next/headers";

export interface ModerateData {
  status: "APPROVED" | "REJECTED" ;
  [key: string]: any;
}


const api_url = env.API_URL;

export const reviewService = {
  createReview: async (mealid:string,data:any) => {
    console.log(data,'mealdsjfsdf')
    try {
      const cookieStore = await cookies()

      const res = await fetch(`${api_url}/api/meals/${mealid}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });
       const result = await res.json();
       console.log(result,'resultdata')
      if(!res.ok){

        return {
          success:false,
          message:result.message|| "review create failed"
        }
      }
  
      return safeData(result,{});
    } catch (e:any) {
      return { success: false,message:e.message, error: "Server error" };
    }
  },

  deleteReview: async (reviewid: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/review/${reviewid}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) return { success: false, message: result.message || "Delete failed" };

      return safeData(result, {});
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

  moderateReview: async (reviewId: string, data: ModerateData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/review/${reviewId}/moderate`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) return { success: false, message: result.message || "Moderation failed" };

      return result;
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

   reviewUpdate: async (reviewId: string, comment:string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${api_url}/api/review/${reviewId}/moderate`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(comment),
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) return { success: false, message: result.message || "update failed" };

      return result;
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

    getAllReviews: async () => {
    try {
      const res = await fetch(`${api_url}/api/reviews`, {
        method: "GET",
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok) {
        return { success: false, message: result.message || "Failed to fetch reviews" };
      }

      return result;
    } catch (e: any) {
      return { success: false, message: e.message, error: "Server error" };
    }
  },

  
};