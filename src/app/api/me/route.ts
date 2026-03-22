
import { userSerive } from "@/service/user.service";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await userSerive.getSession();

    return NextResponse.json({
        data: result.data,
        error: result.error,
    });
}
