"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
const api_url=env.API_URL

export async function getSession() {
  try {
    const cookieStore =await cookies();

    const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials:"include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const session = await res.json();

    if (!session) {
      return { data: null, error: "No session" };
    }

    return { data: session, error: null };
  } catch (e) {
    return { data: null, error: "Server error" };
  }
}


export async function getuserProvider() {
  try {
      const cookieStore =await cookies();
    const res =await fetch(`${api_url}/provider/own`,{
      credentials:'include',
      headers:{ Cookie: cookieStore.toString(),}
    })

    const data =await res.json()
   
    if(!data){
      return { data: null, error: "provider not found" }
    }
     return { data, error: null }
    
  } catch (error) {
     return { data: null, error: "server error" }
  }
  
}