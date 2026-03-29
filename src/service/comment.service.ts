import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const CommentService = {
    // service/comment.service.ts

    createComment: async function (ideaId: string, payload: { content: string, parentId?: string }) {
        const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5000"; // ব্যাকআপ হিসেবে সরাসরি ইউআরএল

        try {
            const cookieStore = await cookies();
            const url = `${BACKEND_URL}/api/v1/comment/create-comment/${ideaId}`;

            console.log("🚀 Sending Request to:", url); // টার্মিনালে চেক করুন ইউআরএল ঠিক আছে কি না

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({
                    content: payload.content,
                    parentId: payload.parentId || null // parentId না থাকলে null পাঠান
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed");

            return { success: true, data: result.data };
        } catch (error: any) {
            console.error("❌ API Fetch Error:", error.message); // টার্মিনালে আসল এরর প্রিন্ট হবে
            return { success: false, error: error.message || "Network Error" };
        }
    },
    // ২. সব কমেন্ট এবং তাদের নেস্টেড রিপ্লাই নিয়ে আসা
    getCommentsByIdeaId: async function (ideaId: string) {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/v1/comment/get-comments/${ideaId}`, {
                method: "GET",
                headers: {
                    // কুকি পাস করা হচ্ছে যাতে অথেন্টিকেশন কাজ করে
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store", // ক্যাশ বন্ধ রাখা হয়েছে
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

    // ৩. আপডেট কমেন্ট
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

    // ৪. ডিলিট কমেন্ট
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