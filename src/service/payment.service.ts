/* eslint-disable @typescript-eslint/no-unused-vars */
// src/services/payment.service.ts
import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL

export const paymentService = {
    createCheckoutSession: async function (ideaId: string) {
        try {
            const cookieStore = await cookies();
            const sessionToken = cookieStore.get("better-auth.session_token")?.value || "";
            const accessToken = cookieStore.get("accessToken")?.value || "";

            const res = await fetch(`${BACKEND_URL}/api/v1/payment/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Cookie": `better-auth.session_token=${sessionToken}; accessToken=${accessToken}`
                },
                body: JSON.stringify({ ideaId }),
            });

            const result = await res.json();
            if (res.ok && result.success) {
                return { url: result.data, error: null };
            }

            return { url: null, error: result.message || "Payment session failed" };
        } catch (error) {
            return { url: null, error: "Network error during payment" };
        }
    }
};