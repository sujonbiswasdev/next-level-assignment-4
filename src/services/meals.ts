import { env } from "@/env"
import { cookies } from "next/headers"
import { safeData } from "@/lib/safeResponsive";
import { MealData, UpdateMealsData } from "@/types/meals/mealstype";
const api_url = env.API_URL

interface ServiceOptionds {
  cache?: RequestCache;
  revalidate?: number;
}
export interface GetMealsParams {
  search?: string;
}

export const mealsService={
     createMeals:async (mealsdata:MealData) => {
      console.log(JSON.stringify(mealsdata),'dlkjdksjfjsdatatata')
      const cookieStore = await cookies()
     try {
      const res = await fetch(`${api_url}/api/provider/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(mealsdata),
      });

         const data = await res.json();

         if(!res.ok){
            return {data:null,error:data.result.data[0].message||"meals create failed"}
         }
         return {data:mealsdata,error:null}
    } catch (error) {
         return { data: null, error: { message: "Something Went Wrong" } };
    }
},
getmeals:async(params?:any,options?:ServiceOptionds)=>{
 try {
  const url = new URL(`${api_url}/api/meals`);

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
      config.next={...config.next,tags:["mealsPost"]}

      const res = await fetch(url.toString(), config);
 

         
      const data = await res.json();
      console.log(data,'data')

       return safeData(data,{})
 } catch (error) {
  
 }

},

getmealsforadmin:async(params?:any)=>{

   try {
              const cookieStore = await cookies()
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
                  next:{
                      tags:['mealsPost']
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

getmealsown:async()=>{
 try {
  const cookieStore = await cookies()
      const res = await fetch(`${api_url}/api/provider/meals/own`,
        {credentials:"include",
          next:{tags:["mealsPost"]},
          headers:{
            Cookie: cookieStore.toString(),
          }});
      const data = await res.json();
       return { data: data, error: null };
 } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
 }

},
MealStatusUpdate:async(id:string,mealsdata:string)=>{
 try {
  const cookieStore = await cookies()
      const res = await fetch(`${api_url}/api/admin/meals/${id}`,
        {credentials:"include",
          next:{tags:["mealsPost"]},
          headers:{
            Cookie: cookieStore.toString(),
          },
           body: JSON.stringify(mealsdata),
        });
      const data = await res.json();
       return safeData(data,{});
 } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
 }

},


getmealsbyid:async(id:string)=>{
  try {
      const res=await fetch(`${api_url}/api/meals/${id}`)
      const body= await res.json()
      return safeData(body,{})
  } catch (error:any) {
     return {
        data:null,
        error:error.message
      }
  }

},

handleDelete:async (id: string) => {
  try {
    const res = await fetch(`${api_url}/api/meals/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete meal");
    }
    return { success: true, message: "Meal deleted successfully" };
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
},
updateMeals:async(id:string,mealsdata:UpdateMealsData)=>{  
  try {
    const cookieStore = await cookies()
    const res = await fetch(`${api_url}/api/provider/meals/${id}`, {
      method: "PUT",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(mealsdata),
    });
    const data = await res.json();
    if (!res.ok) {
       return { success: false, error: data.result?.message || "An error occurred while updating the meal" }
    }
    return { success: true, message: "Meal updated successfully", data };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || "An error occurred while updating the meal" };
  }
}
}