/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { approveIdeas } from "@/interface/approveIdea.interface";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL
export const adminService = {
    getAllUsers: async function () {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/admin/get-all-users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken || ''}; accessToken=${accessToken || ''}`,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: "Unauthorized access!" };
            }

            const result = await res.json();
            return { data: result.data || result, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    deleteUser: async function (userId: string) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}api/v1/admin/delete-user/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { data: null, error: result.message || "Failed to delete user" };

            return { deletedUser: result.data, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    toggleBlockUser: async function (userId: string) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/admin/toggle-user-status/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { data: null, error: result.message || "Failed to toggle block status" };

            return { toggleBlockUser: result.data, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    transactionActivity: async function () {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/admin/transaction-activity`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken || ''}; accessToken=${accessToken || ''}`,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: "Unauthorized access!" };
            }

            const result = await res.json();
            return { data: result.data || result, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    getPendingIdeas: async function () {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/idea/get-pending-idea`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { data: [], error: result.message || "Failed to load pending ideas" };

            return { data: result.data, error: null };
        } catch (error) {
            return { data: [], error: "Something Went Wrong" };
        }
    },

    approveIdeas: async function (payload: approveIdeas) {
        const { ideaId, status, adminFeedback } = payload;
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/idea/approve-idea/${ideaId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                body: JSON.stringify({
                    status,
                    feedback: adminFeedback
                }),
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { success: false, error: result.message || "Failed" };
            return { success: true, data: result.data, error: null };
        } catch (error) {
            return { success: false, error: "Something Went Wrong" };
        }
    },
    createCategory: async function (payload: { name: string; slug: string }) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value || "";
            const accessToken = cookieStore.get("accessToken")?.value || "";

            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            });

            const text = await res.text();
            let result = {};

            try {
                result = text ? JSON.parse(text) : {};
            } catch (e) {
                result = {};
            }

            if (!res.ok) {
                return {
                    success: false,
                    error: (result as any)?.message || "Failed to create category"
                };
            }

            return { success: true, data: result };
        } catch (error) {
            console.error("API Error:", error);
            return { success: false, error: "Connection to server failed" };
        }
    },
    getAllCategory: async function () {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/category`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) return { data: [], error: result.message || "Failed to load all category" };

            return { data: result.data, error: null };
        } catch (error) {
            return { data: [], error: "Something Went Wrong" };
        }
    },
}