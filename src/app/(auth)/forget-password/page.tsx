'use client';

import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2, KeyRound, ShieldCheck, Eye, EyeOff, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { forgetPasswordAction, resetPasswordAction } from './ForgetPasswordAction';

type Step = 'EMAIL' | 'OTP';

export default function ForgetPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>('EMAIL');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Step 1: Handle Email Submit
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await forgetPasswordAction(email);

        if (res?.data?.success) {
            toast.success("OTP request successful! Use 123456 to reset.");
            setStep('OTP');
        } else {
            toast.error(res?.error || "User not found or something went wrong");
        }
        setIsLoading(false);
    };

    // Step 2: Handle OTP & Password Reset
    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend Validation for Static OTP
        if (otp.trim() !== "123456") {
            toast.error("Invalid OTP! Please use 123456");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        const payload = {
            email: email.trim().toLowerCase(),
            otp: otp.trim(),
            password: newPassword
        };

        const res = await resetPasswordAction(payload);

        if (res?.data?.success) {
            toast.success("Password reset successful! Please login.");
            router.push('/login');
        } else {
            toast.error(res?.data?.message || res?.error || "Invalid OTP or request failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#1c1c1d] p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800">

                {/* Header Section */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 mb-6">
                        {step === 'EMAIL' ? <KeyRound className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        {step === 'EMAIL' ? "Forgot Password?" : "Reset Security"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium px-4">
                        {step === 'EMAIL' ? "Enter your email to receive a security OTP." : `Enter the 6-digit code sent to ${email}`}
                    </p>
                </div>

                {/* Step 1: Email Form */}
                {step === 'EMAIL' && (
                    <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                            <div className="relative group flex items-center">
                                <div className="absolute left-4 flex items-center pointer-events-none z-10">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{ paddingLeft: '3.5rem' }}
                                    className="block w-full py-4 bg-gray-50 dark:bg-[#252526] border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <button disabled={isLoading} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Send OTP"}
                        </button>
                    </form>
                )}

                {/* Step 2: OTP & Password Form */}
                {step === 'OTP' && (
                    <form onSubmit={handleResetSubmit} className="mt-8 space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Verification Code</label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                                className="block w-full text-center tracking-[1rem] text-2xl font-black py-4 bg-gray-50 dark:bg-[#252526] border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none placeholder:tracking-normal placeholder:text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">New Password</label>
                            <div className="relative group flex items-center">
                                <div className="absolute left-4 flex items-center pointer-events-none z-10">
                                    <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{ paddingLeft: '3.5rem', paddingRight: '3.5rem' }}
                                    className="block w-full py-4 bg-gray-50 dark:bg-[#252526] border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button disabled={isLoading} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg mt-2">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Verify & Reset"}
                        </button>
                    </form>
                )}

                {/* Back Link */}
                <div className="text-center mt-6">
                    <Link href="/login" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}