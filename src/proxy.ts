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

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);
    return !!refresh;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}

async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Accept both manual and social login (e.g. Google) tokens/cookies
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(
      new URL("/login?error=not_logged_in", request.url)
    );
  }

  let isValidAccessToken = false;
  if (accessToken) {
    try {
      isValidAccessToken = jwtUtils.verifyToken(
        accessToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ).success;
    } catch {
      isValidAccessToken = false;
    }
  }

  if (
    isValidAccessToken &&
    refreshToken &&
    (await isTokenExpiringSoon(accessToken as string))
  ) {
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    try {
      const refreshed = await refreshTokenMiddleware(refreshToken);

      if (refreshed) {
        requestHeaders.set("x-token-refreshed", "1");
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
        headers: response.headers,
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
    }

    return response;
  }

  // Get session user (regardless of login method)
  const user = await getSession();

  // Block or redirect if session/user invalid
  if (!user?.data || user.error || !user.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = user.data.role;
  if (user.data.status === "suspend") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authorization and route access logic
  // Customer and admin can't access provider routes
  if (
    (role === Roles.Customer || role === Roles.Admin) &&
    pathname.startsWith("/provider")
  ) {
    return NextResponse.redirect(
      new URL("/login?error=provider_access_only_for_Provider", request.url)
    );
  }
  // Customer and provider can't access admin routes
  if (
    (role === Roles.Customer || role === Roles.Provider) &&
    pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/login?error=admin_access_only_for_Admin", request.url)
    );
  }
  // Non-customer can't access customer-order related routes
  if (
    (role === Roles.Admin || role === Roles.Provider) &&
    (pathname.startsWith("/orders") ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/checkout"))
  ) {
    let errorMsg = "access_only_for_customer";
    if (pathname.startsWith("/orders")) errorMsg = "order_access_only_for_customer";
    if (pathname.startsWith("/cart")) errorMsg = "cart_access_only_for_customer";
    if (pathname.startsWith("/checkout")) errorMsg = "checkout_access_only_for_customer";
    return NextResponse.redirect(
      new URL(`/login?error=${errorMsg}`, request.url)
    );
  }

  // Dashboard & profile access shortcut redirects
  if (pathname === "/login" || pathname === "/register") {
    if (role === Roles.Admin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === Roles.Provider) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  if (pathname === "/profile") {
    if (role === Roles.Admin) {
      return NextResponse.redirect(
        new URL("/admin-dashboard/profile", request.url)
      );
    }
    if (role === Roles.Provider) {
      return NextResponse.redirect(
        new URL("/provider-dashboard/profile", request.url)
      );
    }
  }

  if (pathname.startsWith("/dashboard") && role === Roles.Customer) {
    return NextResponse.redirect(
      new URL("/login?error=access_define", request.url)
    );
  }

  if (pathname.startsWith("/dashboard")) {
    if (role === Roles.Admin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === Roles.Provider) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  // Protect each dashboard by role
  if (pathname.startsWith("/admin-dashboard") && role !== Roles.Admin) {
    return NextResponse.redirect(
      new URL("/login?error=admin-dashboard_access_only_for_admin", request.url)
    );
  }
  if (pathname.startsWith("/provider-dashboard") && role !== Roles.Provider) {
    return NextResponse.redirect(
      new URL("/login?error=provider-dashboard_access_only_for_provider", request.url)
    );
  }

  // Provider route normalization
  if (role === Roles.Provider) {
    if (pathname === "/provider" || pathname.startsWith("/provider/")) {
      const newPath = pathname.replace(/^\/provider/, "/provider-dashboard");
      return NextResponse.redirect(new URL(newPath, request.url));
    }
    if (pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(
        new URL("/login?error=admin_cannot_access_provider", request.url)
      );
    }
    return NextResponse.next();
  }

  // Admin route normalization
  if (role === Roles.Admin) {
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const newPath = pathname.replace(/^\/admin/, "/admin-dashboard");
      return NextResponse.redirect(new URL(newPath, request.url));
    }
    if (pathname.startsWith("/provider-dashboard")) {
      return NextResponse.redirect(
        new URL("/login?error=provider_cannot_access_provider", request.url)
      );
    }
    return NextResponse.next();
  }

  // For allowed users, just forward
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/admin-dashboard/:path*",
    "/provider",
    "/dashboard/:path*",
    "/provider-dashboard/:path*",
    "/provider/:path*",
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/admin/:path*",
  ],
};

export default proxy;
