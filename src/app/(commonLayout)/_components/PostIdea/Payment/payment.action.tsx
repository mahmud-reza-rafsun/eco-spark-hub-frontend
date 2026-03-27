// src/app/actions/payment.action.ts
"use server";

import { paymentService } from "@/service/payment.service";

export async function handlePaymentAction(ideaId: string) {
    const res = await paymentService.createCheckoutSession(ideaId);
    if (res?.url) {
        return { url: res.url, error: null };
    }
    return { url: null, error: res?.error || "Payment failed" };
}