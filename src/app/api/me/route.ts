import { userService } from "@/service/user.service";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await userService.getSession();

    const userData = result?.data?.data || null;

    return NextResponse.json({
        success: result?.data?.success || false,
        user: userData,
        error: result.error,
    });
}