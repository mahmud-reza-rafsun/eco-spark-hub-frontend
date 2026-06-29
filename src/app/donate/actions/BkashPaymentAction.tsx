// src/app/actions/payment.action.ts
"use server";

import { DonationPayload } from "@/interface/donations.interface";
import { DonationsService } from "@/service/donations.service";

export async function handleBkashDonationAction(payload: DonationPayload) {
    const res = await DonationsService.createBkashDonation(payload);
    if (res.data) {
        return { url: res.data, error: null };
    }
    return { url: null, error: res?.error || "Donation failed" };
}
