/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";

const AUTH_URL = env.AUTH_URL

export const authService = {
    forgetPassword: async function (email: any) {
        try {
            const res = await fetch(`${AUTH_URL}/api/v1/auth/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result.message || "Failed to send OTP" };
            }

            return { data: result, error: null };
        } catch (error) {
            console.log("Forget Password Error:", error);
            return { data: null, error: "Connection Error" };
        }
    },

    resetPassword: async function (payload: any) {
        try {
            const res = await fetch(`${AUTH_URL}/api/v1/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result.message || "Failed to reset password" };
            }

            return { data: result, error: null };
        } catch (error) {
            console.log("Reset Password Error:", error);
            return { data: null, error: "Connection Error" };
        }
    }
}