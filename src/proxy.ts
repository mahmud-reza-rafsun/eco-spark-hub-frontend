import { Roles } from "@/constants/Roles";
import { userService } from "@/service/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    try {
        const { data } = await userService.getSession();
        const role = data?.role;

        // 1. Session na thakle login e pathai dao
        if (!data) {
            // already /login e thakle abar redirect korar dorkar nai (safety)
            if (pathname === "/login") {
                return NextResponse.next();
            }
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // 2. Exact "/dashboard" hit korle shudhu allow koro, kono redirect na
        if (pathname === "/dashboard") {
            return NextResponse.next();
        }

        // 3. Admin-only route
        if (pathname.startsWith("/dashboard/admin") && role !== Roles.admin) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // 4. Member-only route
        if (pathname.startsWith("/dashboard/member") && role !== Roles.member) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        // session fetch e kono error hole crash na kore login e pathai dao
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
