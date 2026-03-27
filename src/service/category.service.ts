import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const categoryService = {
    getAllCategories: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${BACKEND_URL}/api/v1/category`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: [],
                    error: result.message || "Failed to fetch categories"
                };
            }

            return { data: result.data || result, error: null };
        } catch (error) {
            console.error("Category Fetch Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },

    createCategory: async function (payload: { name: string }) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${BACKEND_URL}/api/v1/category/create-category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: result.message || "Failed to create category"
                };
            }

            return { data: result.data || result, error: null };
        } catch (error) {
            console.error("Category Create Error:", error);
            return { data: null, error: "Network error, please try again" };
        }
    }
};