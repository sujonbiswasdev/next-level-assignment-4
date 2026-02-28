"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
const api_url = env.API_URL

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
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
  } catch (e:any) {
    return { data: null, error:'server error' };
  }
}

export async function loginUser(userdata: any) {

  try {
    const storeCookies = await cookies();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json', Cookie: storeCookies.toString() },
      cache:"no-store",
      body: JSON.stringify(userdata)
    })
    const body = await response.json()
    if (!response.ok) {
      return { data: null, error: "provider not found" }
    }

    if (response.ok) {
      storeCookies.set("assignment-4.session_token", body?.result.data.token);
    }
    return { data: body, error: null }

  } catch (error) {
    return { data: null, error: "server error" }
  }

}



export async function getuserProvider() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${api_url}/api/provider/own`, {
      credentials: 'include',
      headers: { Cookie: cookieStore.toString(), }
    })

    const data = await res.json()

    if (!data) {
      return { data: null, error: "provider not found" }
    }
    return { data, error: null }

  } catch (error) {
    return { data: null, error: "server error" }
  }

}


