import { env } from "@/env"
import { cookies } from "next/headers"
import { MealFormData } from "@/types/mealsType"
const api_url = env.API_URL

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export interface GetMealsParams {
  search?: string;
}

export const mealsService={
     createMeals:async (mealsdata:MealFormData) => {
      console.log(JSON.stringify(mealsdata),'dlkjdksjfjsdatatata')
      const cookieStore = await cookies()
     try {
      const res = await fetch(`${api_url}/provider/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(mealsdata),
      });

         const data = await res.json();
         console.log(data,'data')

         if(!res.ok){
            return {data:null,error:data.result.data[0].message||"meals create failed"}
         }
         return {data:mealsdata,error:null}
    } catch (error) {
         return { data: null, error: { message: "Something Went Wrong" } };
    }
},
getmeals:async(params?:GetMealsParams,options?:ServiceOptions)=>{
 try {
  const url = new URL(`${api_url}/meals`);

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
        config.next = { revalidate: options.revalidate };
      }


      const res = await fetch(url.toString(), config);
 

         
      const data = await res.json();

       return { data: data, error: null };
 } catch (error) {
  
 }

}
}