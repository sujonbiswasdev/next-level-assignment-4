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

    if((role===Roles.Admin || role===Roles.Provider) && pathname.startsWith("/orders")){
     return NextResponse.redirect(new URL("/login?error=cart_access_only_for_customer", request.url));
  }

  if((role===Roles.Admin || role===Roles.Provider) && pathname.startsWith("/cart")){
     return NextResponse.redirect(new URL("/login?error=cart_access_only_for_customer", request.url));
  }
   if((role===Roles.Admin || role===Roles.Provider) && pathname.startsWith("/checkout")){
     return NextResponse.redirect(new URL("/login?error=checkout_access_only_for_customer", request.url));
  }
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
    return NextResponse.redirect(new URL("/login?error=admin-dashboard_access_only_for_admin", request.url));
  }

  if (pathname.startsWith('/provider-dashboard') && role !== Roles.Provider) {
     return NextResponse.redirect(new URL("/login?error=provider-dashboard_access_only_for_provider", request.url));
  }

  return NextResponse.next();
}
export const config={
    matcher:['/profile','/admin-dashboard/:path*','/dashboard','/provider-dashboard/:path*','/provider','/cart','/checkout','/orders/:path*']
}

export default proxy