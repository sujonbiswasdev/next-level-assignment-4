import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/service";

enum Roles{
    Admin="Admin",
    Provider="Provider"
}
 async function proxy(request: NextRequest) {
  const { data } = await getSession();
  const pathname = request.nextUrl.pathname;
  if (!data?.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const role = data?.result?.role;

  if (pathname === '/login' || pathname === '/register') {
    if (role === Roles.Admin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === Roles.Provider) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  if (pathname.startsWith('/dashboard')) {
    if (role === Roles.Admin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === Roles.Provider) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  if (pathname.startsWith('/admin-dashboard') && role !== Roles.Admin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith('/provider-dashboard') && role !== Roles.Provider) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config={
    matcher:['/profile','/admin-dashboard','/dashboard','/provider-dashboard','/provider']
}

export default proxy