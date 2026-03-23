/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL
export const voteService = {
    toggleVote: async function (ideaId: any, voteType: any) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value;
            const accessToken = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/vote/toggle-vote`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`,
                },
                body: JSON.stringify({
                    ideaId, voteType
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
}