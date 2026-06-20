import { Roles } from "@/constants/Roles";
import { userService } from "@/service/user.service";
import { NextRequest, NextResponse } from "next/server";

// middleware.ts
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const { data } = await userService.getSession();
    const role = data?.role;

    if (!data) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/dashboard") {
        const target = role === "ADMIN" ? "/dashboard" : "/dashboard";
        return NextResponse.redirect(new URL(target, request.url));
    }

    if (pathname.startsWith("/dashboard/")) {
        if (pathname.includes("/ADMIN") && role !== Roles.admin) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }
    if (pathname.startsWith("/dashboard/member") && role !== Roles.member) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};