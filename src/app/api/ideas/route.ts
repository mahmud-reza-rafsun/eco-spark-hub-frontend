import { ideaService } from "@/service/idea.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const res = await ideaService.getAllIdeas({
        searchTerm: searchParams.get("searchTerm") || undefined,
        sortBy: searchParams.get("sortBy") || undefined,
        categoryId: searchParams.get("categoryId") || undefined,
        page: searchParams.get("page") || "1",
        limit: searchParams.get("limit") || "6",
    });

    if (res.error) {
        return NextResponse.json({ error: res.error }, { status: 500 });
    }

    return NextResponse.json(res.data);
}