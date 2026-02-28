// services/adminService.ts
import { env } from "@/env"
import { safeData } from "@/lib/safeResponsive";
import { CategoryStats, MealStats, OrderStats, RevenueDashboardResponse, ReviewStats, UserStats } from "@/types/user/adminstats";
import { Award } from "lucide-react";
import { cookies } from "next/headers"

const api_url = env.API_URL

export const adminService = {
  getUserStats: async ()=> {
    try {
      const cookiestore = await cookies()
      const response = await fetch(`${api_url}/api/admin/users/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      })
      const body = await response.json()
      if (!response.ok) throw new Error(`Error fetching user stats: ${response.statusText}`)
      return body
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
    }
  },

  //  Meals 
  getMealsStats: async ()=> {
    try {
      const cookiestore =await cookies()
      const response = await fetch(`${api_url}/api/admin/meals/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      })
      const data = await response.json()
      if (!response.ok) throw new Error(`Error fetching meals stats: ${response.statusText}`)
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
    }
  },

  //  Orders 
  getOrdersStats: async ()=> {
    try {
      const cookiestore = await cookies()
      const response = await fetch(`${api_url}/api/admin/orders/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      })
      const data = await response.json()
      if (!response.ok) throw new Error(`Error fetching orders stats: ${response.statusText}`)
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
    }
  },

  //Revenue
  getRevenueStats: async () => {
    try {
      const cookiestore =await cookies()
      const response = await fetch(`${api_url}/api/admin/revenue/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      })
      const data = await response.json()
      console.log(data,'datasss')
      if (!response.ok) throw new Error(`Error fetching revenue stats: ${response.statusText}`)
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
    }
  },

  // Reviews
  getReviewStats: async (): Promise<{ data: ReviewStats | null; error: string | null }> => {
    try {
      const cookiestore = cookies()
      const response = await fetch(`${api_url}/api/admin/reviews/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      })
      const body: ReviewStats = await response.json()
      if (!response.ok) throw new Error(`Error fetching review stats: ${response.statusText}`)
      return { data: body, error: null }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
    }
  },

  // Categories 
  getCategoryStats: async () => {
    try {
      const cookiestore = await cookies()
      const response = await fetch(`${api_url}/api/admin/category/stats`, {
        headers: { Cookie: cookiestore.toString() },
        cache: "no-store",
        credentials: "include",
      })
      const data = await response.json()
      console.log(data,'dkdkd')
      if (!response.ok) throw new Error(`Error fetching category stats: ${response.statusText}`)
      return data
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
    }
  },
}