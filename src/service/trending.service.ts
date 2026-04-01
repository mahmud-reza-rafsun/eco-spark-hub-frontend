import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const trendingService = {
    getTrendingIdea: async function () {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${BACKEND_URL}/api/v1/trending/trending-idea`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                next: { revalidate: 0 },
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: [],
                    error: result.message || "Failed to fetch trending ideas"
                };
            }
            const finalData = result.data?.data || result.data || result;

            return {
                data: Array.isArray(finalData) ? finalData : [],
                error: null
            };
        } catch (error) {
            console.error("Trending Fetch Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },
};