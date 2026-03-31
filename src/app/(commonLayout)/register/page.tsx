/* eslint-disable @typescript-eslint/no-explicit-any */
import RegisterFrom from "@/components/modules/authentication/RegisterFrom";
import { env } from "@/env";
import { cookies } from "next/headers";

// Added process.env fallback to ensure it picks up variables in all environments
const BACKEND_URL = process.env.BACKEND_URL || env.BACKEND_URL;

export default function Page() {
    const handleRegisterAndSendOTP = async (formData: any) => {
        "use server";
        try {
            // Ensure BACKEND_URL exists before fetching
            if (!BACKEND_URL) {
                throw new Error("BACKEND_URL is not defined in environment variables");
            }

            const payload = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                image: formData.image
            };

            const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            return {
                success: response.ok,
                // Updated message to guide user to use the static OTP
                message: response.ok
                    ? "Registration initiated! Please use 123456 as your verification code."
                    : (result.message || "Registration failed")
            };
        } catch (error) {
            console.error("Registration Error:", error);
            return { success: false, message: "Internal Server Error" };
        }
    };

    const handleVerifyOTP = async (verifyData: any) => {
        "use server";
        try {
            if (!BACKEND_URL) {
                throw new Error("BACKEND_URL is not defined");
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(verifyData)
            });

            const result = await response.json();

            // If backend verifies the static OTP (123456) and returns data
            if (response.ok && result.data?.accessToken) {
                const cookieStore = await cookies();

                cookieStore.set("accessToken", result.data.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7, // 7 days
                });
            }

            return {
                success: response.ok,
                data: result.data,
                message: result.message
            };
        } catch (error) {
            console.error("Verification Error:", error);
            return { success: false, message: "Verification failed" };
        }
    };

    return (
        <div>
            <RegisterFrom
                onRegister={handleRegisterAndSendOTP}
                onVerify={handleVerifyOTP}
            />
        </div>
    );
}