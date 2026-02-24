import { env } from "@/env"
import { OrderStatsApiResponse, OrderStatsResult } from "@/types/order/orderstats"
import { cookies } from "next/headers"

const api_url=env.API_URL
export const providerServiceStats={
    getrenuestats:async()=>{
        try {
            const cookiestore=await cookies()
            const response = await fetch(`${api_url}/provider/revenue/stats`,
                {
                 headers:{
                         Cookie: cookiestore.toString(),
                    },
                    cache:"no-store",
                    credentials:"include"
                },
            )
             const body = await response.json()
            if (!response.ok) {
                    throw new Error(`Error fetching provider meals: ${response.statusText}`);
                }
            return{
                data:body,
                error:null
            }
          
        } catch (error) {
            return{
                data:null,
                error:error instanceof Error ? error.message : "Unknown error"
            }
        }
    },
    getProvidermealsStats:async()=>{

         try {
            const cookiestore=await cookies()
            const response = await fetch(`${api_url}/provider/meals/stats`,
                {
                 headers:{
                         Cookie: cookiestore.toString(),
                    },
                    cache:"no-store",
                    credentials:"include"
                },
            )
             const body = await response.json()
            if (!response.ok) {
                    throw new Error(`Error fetching provider meals: ${response.statusText}`);
                }
            return{
                data:body,
                error:null
            }
          
        } catch (error) {
            return{
                data:null,
                error:error instanceof Error ? error.message : "Unknown error"
            }
        }

    },
    getownorderstats:async()=>{
          try {
            const cookiestore=await cookies()
            const response = await fetch(`${api_url}/provider/orders/stats`,
                {
                 headers:{
                         Cookie: cookiestore.toString(),
                    },
                    cache:"no-store",
                    credentials:"include"
                },
            )
             const body:OrderStatsApiResponse = await response.json()
             console.log(body,'body data')
            if (!response.ok) {
                    throw new Error(`Error fetching provider meals: ${response.statusText}`);
                }
            return{
                data:body,
                error:null
            }
          
        } catch (error) {
            return{
                data:null,
                error:error instanceof Error ? error.message : "Unknown error"
            }
        }
    }
}