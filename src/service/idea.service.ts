/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL
export const ideaService = {
    createIdeaPost: async function (payload: any) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value || "";
            const accessToken = cookieStore.get("accessToken")?.value || "";

            if (!sessionToken || !accessToken) {
                return {
                    data: null,
                    error: "Session or Access token missing. Please login again."
                };
            }

            const res = await fetch(`${BACKEND_URL}/api/v1/idea/create-idea`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result.message || "Unauthorized" };
            }

            return { data: result.data, error: null };
        } catch (error: any) {
            console.error("Post Idea Error:", error);
            return { data: null, error: "Network error occurred" };
        }
    },
    getAllIdeas: async function (params: { searchTerm?: string; sortBy?: string; categoryId?: string }) {
        const { searchTerm, sortBy, categoryId } = params;
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append('searchTerm', searchTerm);
        if (sortBy) queryParams.append('sortBy', sortBy);
        if (categoryId) queryParams.append('categoryId', categoryId);

        const queryString = queryParams.toString();
        const url = `${BACKEND_URL}/api/v1/idea/get-all-idea${queryString ? `?${queryString}` : ''}`;

        console.log("Fetching ideas from:", url);

        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.log("Backend Response Error:", errorText);
                return { data: null, error: "Failed to fetch ideas" };
            }

            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.log("Connection Error:", error);
            return { data: null, error: "Something Went Wrong" };
        }
    },
    getSingleIdea: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/idea/get-single-idea/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                console.log("Backend Response Error:", result.message);
                return { data: null, error: result.message || "Failed to fetch" };
            }

            return { data: result.data, error: null };
        } catch (error) {
            console.log("Connection Error:", error);
            return { data: null, error: "Something Went Wrong" };
        }
    },

}