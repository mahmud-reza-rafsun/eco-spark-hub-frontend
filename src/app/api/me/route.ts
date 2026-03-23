import { userService } from "@/service/user.service";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await userService.getSession();

    // আপনার কনসোল অনুযায়ী আসল ইউজারের ডাটা আছে result.data.data এর ভেতর
    const userData = result?.data?.data || null;

    return NextResponse.json({
        success: result?.data?.success || false,
        user: userData, // সরাসরি 'user' কি-তে ডাটা পাঠাচ্ছি
        error: result.error,
    });
}