/* eslint-disable @typescript-eslint/no-explicit-any */
import RegisterFrom from "@/components/modules/authentication/RegisterFrom";
import { env } from "@/env";

const BACKEND_URL = env.BACKEND_URL;

export default function Page() {
    const handleRegisterAndSendOTP = async (formData: any) => {
        "use server";
        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                image: formData.image
            };
            const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            return { success: response.ok };
        } catch (error) {
            console.error("Error:", error);
            return { success: false };
        }
    };

    const handleVerifyOTP = async (verifyData: any) => {
        "use server";
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/auth/verify-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(verifyData)
            });

            return { success: response.ok };
        } catch (error) {
            console.error("Error:", error);
            return { success: false };
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