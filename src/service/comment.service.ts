/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const CommentService = {
    // ১. কমেন্ট তৈরি
    createComment: async function (ideaId: string, payload: { content: string, parentId?: string }) {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${BACKEND_URL}/api/v1/comment/create-comment/${ideaId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, error: errorData.message || "Failed to post" };
            }

            const result = await res.json();
            return { success: true, data: result.data, error: null };
        } catch (error) {
            return { success: false, error: "Something Went Wrong" };
        }
    },

    // ২. সব কমেন্ট নিয়ে আসা
    getCommentsByIdeaId: async function (ideaId: string) {
        try {
            const res = await fetch(`${BACKEND_URL}/api/v1/comment/get-comments/${ideaId}`, {
                cache: "no-store",
            });

            if (!res.ok) return { data: null, error: "Failed to fetch comments" };

            const result = await res.json();
            return { data: result.data, error: null };
        } catch (error) {
            return { data: null, error: "Connection Error" };
        }
    },

    // ৩. কমেন্ট আপডেট (যেটা আপনি চেয়েছিলেন)
    updateComment: async function (commentId: string, payload: { content: string }) {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${BACKEND_URL}/api/v1/comment/update-comment/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, error: errorData.message || "Update failed" };
            }

            const result = await res.json();
            return { success: true, data: result.data, error: null };
        } catch (error) {
            return { success: false, error: "Connection Error" };
        }
    },

    // ৪. কমেন্ট ডিলিট
    deleteComment: async function (commentId: string) {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${BACKEND_URL}/api/v1/comment/delete-comment/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Cookie": allCookies,
                },
            });

            if (!res.ok) return { success: false, error: "Failed to delete" };

            return { success: true, error: null };
        } catch (error) {
            return { success: false, error: "Connection Error" };
        }
    }
};