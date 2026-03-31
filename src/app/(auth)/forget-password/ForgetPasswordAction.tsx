/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { authService } from "@/service/auth.service";

export const forgetPasswordAction = async (email: string) => {
    try {
        const result = await authService.forgetPassword(email);
        return result;
    } catch (error: any) {
        return { data: null, error: error.message || "Failed to send OTP" };
    }
};

export const resetPasswordAction = async (payload: any) => {
    try {
        // Payload clean up
        const formattedPayload = {
            email: payload.email,
            otp: payload.otp,
            password: payload.password
        };

        const result = await authService.resetPassword(formattedPayload);
        return result;
    } catch (error: any) {
        return { data: null, error: error.message || "Failed to reset password" };
    }
};