/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DonationPayload } from "@/interface/donations.interface";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const DonationsService = {
    createBkashDonation: async function (payload: DonationPayload) {
        try {
            const cookieStore = await cookies();
            const url = `${BACKEND_URL}/api/v1/donations/create-donation`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({ ...payload }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed");

            return { success: true, data: result.data };
        } catch (error: any) {
            console.error("❌ API Fetch Error:", error.message);
            return { success: false, error: error.message || "Network Error" };
        }
    },

};
