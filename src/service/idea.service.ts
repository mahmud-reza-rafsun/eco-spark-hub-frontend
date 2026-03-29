/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { getAllIdeasParams } from "@/interface/pagination.interface";
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
    getAllIdeas: async function (params: getAllIdeasParams) {
        const { searchTerm, sortBy, categoryId, page, limit } = params;

        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append('searchTerm', searchTerm);
        if (sortBy) queryParams.append('sortBy', sortBy);
        if (categoryId) queryParams.append('categoryId', categoryId);
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);

        const queryString = queryParams.toString();
        const url = `${BACKEND_URL}/api/v1/idea/get-all-idea${queryString ? `?${queryString}` : ''}`;

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
                return { data: null, error: "Failed to fetch ideas" };
            }

            const data = await res.json();
            return { data: data, error: null };
        } catch (error) {
            console.error("Connection Error:", error);
            return { data: null, error: "Something Went Wrong" };
        }
    },
    getSingleIdea: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/idea/get-single-idea/${id}`, {
                method: "GET",
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
    getMyIdea: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/idea/get-single-idea/${id}`, {
                method: "GET",
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
    updateIdea: async function (payload: any, ideaId: string) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/idea/${ideaId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                body: JSON.stringify({
                    payload
                }),
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { success: false, error: result.message || "Failed to update idea" };
            return { success: true, data: result.data, error: null };
        } catch (error) {
            return { success: false, error: "Something Went Wrong" };
        }
    },
    deleteIdea: async function (ideaId: string) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;
            if (!accessToken) {
                return { success: false, error: "No access token found in cookies" };
            }

            const res = await fetch(`${BACKEND_URL}/api/v1/idea/delete-idea/${ideaId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                    "Authorization": `Bearer ${accessToken}`
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { success: false, error: result.message || "Unauthorized" };

            return { success: true, error: null };
        } catch (error) {
            return { success: false, error: "Something Went Wrong" };
        }
    },
}