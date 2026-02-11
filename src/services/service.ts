"use server";

import { cookies } from "next/headers";

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