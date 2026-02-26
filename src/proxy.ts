import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/service";

enum Roles {
  Admin = "Admin",
  Provider = "Provider",
  Customer = "Customer"
}
async function proxy(request: NextRequest) {
  const { data } = await getSession();
  const pathname = request.nextUrl.pathname;
  if (!data?.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const role = data?.result?.role;
  if (data.result.status === 'suspend') {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if ((role === Roles.Admin || role === Roles.Provider) && pathname.startsWith("/orders")) {
    return NextResponse.redirect(new URL("/login?error=cart_access_only_for_customer", request.url));
  }
  if ((role === Roles.Admin || role === Roles.Provider) && pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/login?error=cart_access_only_for_customer", request.url));
  }
  if ((role === Roles.Admin || role === Roles.Provider) && pathname.startsWith("/checkout")) {
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

  if (pathname === '/profile') {
    if (role === Roles.Admin) {
      return NextResponse.redirect(new URL("/admin-dashboard/profile", request.url));
    }
    if (role === Roles.Provider) {
      return NextResponse.redirect(new URL("/provider-dashboard/profile", request.url));
    }
  }

  if (pathname.startsWith('/dashboard') && role == 'Customer') {
    return NextResponse.redirect(new URL("/login?error=access_define", request.url));
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

  if (role === Roles.Provider) {
    if (pathname === "/provider" || pathname.startsWith("/provider/")) {
      const newPath = pathname.replace(/^\/provider/, "/provider-dashboard");
      const url = new URL(newPath, request.url);
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(
        new URL("/login?error=admin_cannot_access_provider", request.url)
      );
    }
    return NextResponse.next();
  }
  if (role === Roles.Admin) {
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const newPath = pathname.replace(/^\/admin/, "/admin-dashboard");
      const url = new URL(newPath, request.url);
      return NextResponse.redirect(url);
    }

    // Block provider-dashboard for admin
    if (pathname.startsWith("/provider-dashboard")) {
      return NextResponse.redirect(
        new URL("/login?error=provider_cannot_access_provider", request.url)
      );
    }

    return NextResponse.next();
  }


  return NextResponse.next();
}
export const config = {
  matcher: ['/profile', '/admin-dashboard/:path*', '/dashboard', '/provider-dashboard/:path*', '/provider/:path*', '/cart', '/checkout', '/orders/:path*', '/profile', '/admin/:path*']
}

export default proxy