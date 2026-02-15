"use server"
import { env } from "@/env";
import { cookies } from "next/headers";
const api_url=env.API_URL

export const getcategory=async()=>{
    try {
         const cookieStore =await cookies();
        const res=await fetch(`${api_url}/admin/category`,{
            credentials:"include",
            headers:{
                 Cookie: cookieStore.toString()
            },
            next:{
                revalidate:10,
            }

        })
        const body=await res.json()
        return {
            data:body,
            error:null
        }
    } catch (error) {
        console.log(error)
    }
}