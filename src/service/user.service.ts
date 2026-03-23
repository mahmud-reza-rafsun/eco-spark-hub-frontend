import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const allCookies = cookieStore.toString();

            const res = await fetch(`${AUTH_URL}/api/v1/auth/me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": allCookies,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.log("Backend Response Error:", errorText);
                return { data: null, error: "Failed to fetch session" };
            }

            const session = await res.json();
            return { data: session, error: null };
        } catch (error) {
            console.log("Connection Error:", error);
            return { data: null, error: "Something Went Wrong" };
        }
    }
}