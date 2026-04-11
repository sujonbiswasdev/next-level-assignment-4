"use server";

import { env } from "@/env";
import { deleteCookie } from "@/lib/cookieUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse, ApiResponse } from "@/types/response.type";
import { Ilogin, TAuthData } from "@/types/auth.type";
import { TUser } from "@/types/user.type";
import { cookies } from "next/headers";
const api_url = env.API_URL;



export async function getNewTokensWithRefreshToken(refreshToken  : string) : Promise<boolean> {
    try {
        const res = await fetch(`${api_url}/api/auth/refresh-token`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Cookie : `refreshToken=${refreshToken}`
            }
        });

        if(!res.ok){
            return false;
        }

        const {data} = await res.json();

        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if(accessToken){
            await setTokenInCookies("accessToken", accessToken);
        }

        if(newRefreshToken){
            await setTokenInCookies("refreshToken", newRefreshToken);
        }

        if(token){
            await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); 
        }

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    if (!cookieHeader) {
      return null;
    }
    const res = await fetch(`${api_url}/api/v1/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });
    const session = await res.json();
    console.log(session,'data')
    if (!session) {
      return { data: null, error: "No session" };
    }
    return { success:session.success,message:session.message,data:session.data};
  } catch (e: any) {
    return { data: null, error: "server error" };
  }
}
export async function registerUser(registerData: any) {
  const formData = new FormData();

        const { image, ...rest } = registerData;
    
        formData.append("data", JSON.stringify(rest));
        if (image) {
          formData.append("file", image);
        }
        console.log(formData,'fd')
  try {
    const response = await fetch(`${api_url}/api/v1/auth/register`, {
      method: "POST",
      cache: "no-store",
      body: formData,
    });

    const body= await response.json();
    console.log(body,'s')
    if (!response.ok || !body.success) {
      const data = body as ApiErrorResponse;
      return {
       success:data.success,
       message:data.message
      };
    }
    return { success:body.success,message:body.message,data:body.data };
  } catch (error) {
    return { data: null, error: "server error" };
  }
}


export async function loginUser(logindata: Ilogin) {
  try {
    const storeCookies = await cookies();
    const response = await fetch(`${api_url}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: storeCookies.toString(),
      },
      cache: "no-store",
      body: JSON.stringify(logindata),
    });
    const body = await response.json();
    console.log(body,'dsfd')
    const result =body as ApiResponse<TAuthData>
    if (!response.ok || !body.success) {
      const error = body as ApiErrorResponse;
      console.log(error,'sdf')
      return {
        success:error.success,
        message: error.message || "Login failed",
      };
    }

    const { accessToken, refreshToken: newRefreshToken, token } = body.data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    if (token) {
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
    }
    return { success:result.success, message:result.message,data:result.data };
  } catch (error) {
    return { data: null, error: "server error" };
  }
}

export async function Logout() {
  const storeCookies = await cookies();
  const response = await fetch(`${api_url}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: storeCookies.toString(),
    },
    cache: "no-store",
  });
  const body= await response.json();
  const result = body as ApiResponse<TAuthData> 
  if (!response.ok || !body.success) {
    const data = body as ApiErrorResponse;
    return {
      data: null,
      error: data.message || "Logout failed",
    };
  }
  await Promise.all([
    deleteCookie("accessToken"),
    deleteCookie("refreshToken"),
    deleteCookie("better-auth.session_token"),
]);
return {
    success: true,
    message: result.message || "Logged out successfully!",
    data: result.data,
};

}
