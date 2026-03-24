/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL
export const memberService = {
    getMyPendingIdeas: async () => {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/member/get-my-pending-ideas`, {
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
    getMyPurchaseIdeas: async () => {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/member/get-my-purchase-ideas`, {
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
}