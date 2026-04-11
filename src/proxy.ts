import { NextRequest, NextResponse } from "next/server";
import {
  getNewTokensWithRefreshToken,
  getSession,
} from "./services/auth.service";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

enum Roles {
  Admin = "Admin",
  Provider = "Provider",
  Customer = "Customer",
}

async function refreshTokenIfNeeded(refreshToken: string): Promise<boolean> {
  try {
    const result = await getNewTokensWithRefreshToken(refreshToken);
    return !!result;
  } catch (err) {
    console.error("Token refresh failed:", err);
    return false;
  }
}

async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Read tokens from cookies
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;


  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login?error=not_logged_in", request.url));
  }


  let accessValid = false;
  if (accessToken) {
    try {
      const verify = jwtUtils.verifyToken(
        accessToken,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      accessValid = verify.success;
    } catch {
      accessValid = false;
    }
  }

  if (
    accessValid &&
    refreshToken &&
    (await isTokenExpiringSoon(accessToken as string))
  ) {
    const headers = new Headers(request.headers);
    const response = NextResponse.next({ request: { headers } });
    try {
      const refreshed = await refreshTokenIfNeeded(refreshToken);
      if (refreshed) headers.set("x-token-refreshed", "1");
      return NextResponse.next({
        request: { headers },
        headers: response.headers,
      });
    } catch {}
    // fallback to original next
    return response;
  }

  const session = await getSession();

  if (!session?.data || session.error || !session.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = session.data;
  const role: string = user.role;
  const status: string = user.status;

  // Block suspended users
  if (status === "suspend") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (role === Roles.Customer || role === Roles.Admin) &&
    pathname.startsWith("/provider")
  ) {
    return NextResponse.redirect(new URL("/login?error=provider_access_only_for_Provider", request.url));
  }

  // Customer & Provider can't access admin routes
  if (
    (role === Roles.Customer || role === Roles.Provider) &&
    pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/login?error=admin_access_only_for_Admin", request.url));
  }

  // Provider/Admin can't access Customer order/cart/checkout
  if (
    (role === Roles.Admin || role === Roles.Provider) &&
    (pathname.startsWith("/orders") ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/checkout"))
  ) {
    const error =
      pathname.startsWith("/orders")   ? "order_access_only_for_customer" :
      pathname.startsWith("/cart")     ? "cart_access_only_for_customer" :
      pathname.startsWith("/checkout") ? "checkout_access_only_for_customer" :
      "access_only_for_customer";
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));
  }

  // If on login/register page, already logged in? Short-circuit redirect to dashboard
  if (pathname === "/login" || pathname === "/register") {
    if (role === Roles.Admin)     return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (role === Roles.Provider)  return NextResponse.redirect(new URL("/provider/dashboard", request.url));
  }

  // Redirect profile shortcut to respective dashboards
  if (pathname === "/profile") {
    if (role === Roles.Admin)
      return NextResponse.redirect(new URL("/admin/dashboard/profile", request.url));
    if (role === Roles.Provider)
      return NextResponse.redirect(new URL("/provider/dashboard/profile", request.url));
  }

  // Customers cannot access dashboard routes at all
  if (pathname.startsWith("/dashboard") && role === Roles.Customer) {
    return NextResponse.redirect(new URL("/login?error=access_define", request.url));
  }

  // Dashboard shortlinks: if dashboard path, always forcefully map by role
  if (pathname.startsWith("/dashboard")) {
    if (role === Roles.Admin)
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (role === Roles.Provider)
      return NextResponse.redirect(new URL("/provider/dashboard", request.url));
  }

  // Only admin can access admin dashboard
  if (pathname.startsWith("/admin") && role !== Roles.Admin) {
    return NextResponse.redirect(new URL("/login?error=admin-dashboard_access_only_for_admin", request.url));
  }
  // Only provider can access provider dashboard
  if (pathname.startsWith("/provider") && role !== Roles.Provider) {
    return NextResponse.redirect(new URL("/login?error=provider-dashboard_access_only_for_provider", request.url));
  }

  // Provider dashboard normalization (always /provider/dashboard/...)
  if (role === Roles.Provider) {
    if (pathname === "/provider" || pathname.startsWith("/provider/")) {
      const fixedPath = pathname.replace(/^\/provider/, "/provider/dashboard");
      return NextResponse.redirect(new URL(fixedPath, request.url));
    }
    // Prevent providers from admin dashboard
    if (pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/login?error=admin_cannot_access_provider", request.url));
    }
    return NextResponse.next();
  }

  // Admin dashboard normalization (always /admin/dashboard/...)
  if (role === Roles.Admin) {
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const fixedPath = pathname.replace(/^\/admin/, "/admin/dashboard");
      return NextResponse.redirect(new URL(fixedPath, request.url));
    }
    // Prevent admins from provider dashboard
    if (pathname.startsWith("/provider/dashboard")) {
      return NextResponse.redirect(new URL("/login?error=provider_cannot_access_provider", request.url));
    }
    return NextResponse.next();
  }

  // Default: let go through
  return NextResponse.next();
}

export const config = {
  matcher: [
  
  ],
};

export default proxy;
