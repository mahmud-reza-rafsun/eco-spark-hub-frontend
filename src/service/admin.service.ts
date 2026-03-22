/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
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
}