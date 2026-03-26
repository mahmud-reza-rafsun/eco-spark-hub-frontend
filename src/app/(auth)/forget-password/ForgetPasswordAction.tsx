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
        const result = await authService.resetPassword(payload);
        return result;
    } catch (error: any) {
        return { data: null, error: error.message || "Failed to reset password" };
    }
};