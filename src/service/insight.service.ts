/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import { createInshightCategory } from "@/interface/insights.interface";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const insightsService = {
    createInsight: async function (payload: any) {
        try {
            const cookieStore = await cookies();
            const cookieHeader = cookieStore
                .getAll()
                .map((c) => `${c.name}=${c.value}`)
                .join("; ");

            const res = await fetch(`${BACKEND_URL}/api/v1/insights/create-insights`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieHeader,
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: result.message || "Failed to create insight"
                };
            }

            return { data: result, error: null };
        } catch (error) {
            return { data: null, error: "Network error, please try again" };
        }
    },
    getAllInsights: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${BACKEND_URL}/api/v1/insights/get-all-insights`, {
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
                    error: result.message || "Failed to fetch Insights"
                };
            }

            return { data: result.data || result, error: null };
        } catch (error) {
            console.error("insigInsightshts Fetch Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },
    getSingleInsights: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${BACKEND_URL}/api/v1/insights/get-single-insight/${id}`, {
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
                    error: result.message || "Failed to fetch single Insights"
                };
            }

            return { data: result.data || result, error: null };
        } catch (error) {
            console.error("Single insight Fetch Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },
};