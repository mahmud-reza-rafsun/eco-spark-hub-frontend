/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const CommentService = {
    createComment: async function (ideaId: string, payload: { content: string, parentId?: string }) {
        try {
            const cookieStore = await cookies();
            const url = `${BACKEND_URL}/api/v1/comment/create-comment/${ideaId}`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({
                    content: payload.content,
                    parentId: payload.parentId || null
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed");

            return { success: true, data: result.data };
        } catch (error: any) {
            console.error("❌ API Fetch Error:", error.message);
            return { success: false, error: error.message || "Network Error" };
        }
    },
    getCommentsByIdeaId: async function (ideaId: string) {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/v1/comment/get-comments/${ideaId}`, {
                method: "GET",
                headers: {
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Fetch failed:", result.message);
                return { data: [], error: result.message || "Failed to fetch" };
            }

            return { data: result.data || [], error: null };
        } catch (error) {
            console.error("Connection Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },

    updateComment: async function (commentId: string, payload: { content: string }) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${BACKEND_URL}/api/v1/comment/update-comment/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (!res.ok) return { success: false, error: result.message || "Update failed" };
            return { success: true };
        } catch (error) {
            return { success: false, error: "Connection Error" };
        }
    },

    deleteComment: async function (commentId: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${BACKEND_URL}/api/v1/comment/delete-comment/${commentId}`, {
                method: "DELETE",
                headers: { "Cookie": cookieStore.toString() },
            });
            if (!res.ok) return { success: false, error: "Delete failed" };
            return { success: true };
        } catch (error) {
            return { success: false, error: "Connection Error" };
        }
    }
};