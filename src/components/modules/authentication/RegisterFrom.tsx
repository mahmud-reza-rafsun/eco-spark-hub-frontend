/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;

interface RegisterProps {
    onRegister: (data: any) => Promise<{ success: boolean }>;
    onVerify: (data: any) => Promise<{ success: boolean }>;
}

const RegisterFrom: React.FC<RegisterProps> = ({ onRegister, onVerify }) => {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Form States
    const [fullName, setFullName] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [otp, setOtp] = useState<string>('');

    const totalSteps = 4;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => step < totalSteps && setStep(step + 1);
    const handleBack = () => step > 1 && setStep(step - 1);

    const handleRegisterClick = async () => {
        setIsLoading(true);
        const response = await onRegister({ fullName, email, password, image: imagePreview });
        setIsLoading(false);

        if (response.success) {
            toast.success("OTP sent to your email!");
            setStep(4);
        } else {
            toast.error("Registration Failed. Please try again.");
        }
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await onVerify({ email, otp });
        setIsLoading(false);

        if (response.success) {
            toast.success("Verification Successful!");
            router.push('/login');
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center p-4 mt-20">
            <div className="w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Step {step} of {totalSteps}</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{Math.round((step / totalSteps) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
                    </div>
                </div>

                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8">

                    {/* Step 1: Name & Image */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile Info</h2>
                                <p className="text-sm text-gray-500 mt-1">Start by setting up your identity</p>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
                                        {imagePreview ? (
                                            <Image src={imagePreview} height={100} width={100} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <UserIcon />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
                                    >
                                        <CameraIcon />
                                    </button>
                                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                </div>
                                <span className="text-xs text-gray-400">Upload profile picture (optional)</span>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="e.g. Jhon Doe"
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!fullName}
                                className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                            >
                                Continue <ArrowRightIcon />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Credentials */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Credentials</h2>
                                <p className="text-sm text-gray-500 mt-1">Setup your secure login access</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400"><MailIcon /></div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400"><LockIcon /></div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        />
                                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!email || !password}
                                className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                            >
                                Review Account <ArrowRightIcon />
                            </button>
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Review</h2>
                                <p className="text-sm text-gray-500 mt-1">Check your details before we verify</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl space-y-4">
                                <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                        {imagePreview ? <Image src={imagePreview} width={48} height={48} className="w-full h-full object-cover" alt='someone' /> : <div className="p-3"><UserIcon /></div>}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Full Name</p>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">{fullName}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 font-medium">Email</span>
                                    <span className="text-sm font-semibold">{email}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleRegisterClick}
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center transition-all disabled:opacity-70"
                            >
                                {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : "Create & Send Code"}
                            </button>
                        </div>
                    )}

                    {/* Step 4: OTP */}
                    {step === 4 && (
                        <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Verify Email</h2>
                                <p className="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to your inbox</p>
                            </div>

                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="· · · · · ·"
                                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-800 rounded-2xl text-3xl font-bold tracking-[0.3em] text-center outline-none focus:border-indigo-500 transition-all"
                            />

                            <button
                                type="submit"
                                disabled={otp.length !== 6 || isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                                {isLoading ? "Verifying..." : "Verify & Complete"}
                            </button>
                        </form>
                    )}

                    {/* Universal Back Button */}
                    {step > 1 && !isLoading && (
                        <button
                            onClick={handleBack}
                            className="mt-6 w-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <ArrowLeftIcon /> Back to previous
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterFrom;