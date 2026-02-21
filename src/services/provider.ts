import { env } from "@/env"

const api_url=env.API_URL
export const providerService={
    getprovidermeals:async(id:string)=>{
        try {
            const response = await fetch(`${api_url}/providers/${id}`)
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
    }
}