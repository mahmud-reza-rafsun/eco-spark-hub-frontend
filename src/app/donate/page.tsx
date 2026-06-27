"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, ShieldCheck, ArrowRight, RefreshCw, Mail, User, MessageSquare } from "lucide-react";
import PaymentSelectModal from "./_components/PaymentModal";
import HeroNavbar from "../_components/HeroNavbar";

// --- Types ---
type PaymentMethodId = "bkash" | "stripe";

interface PaymentMethodConfig {
    name: string;
    label: string;
    icon: React.ReactNode;
}

// --- Icons ---
const BKashIcon = () => (
    <span className="font-bold text-[#E2136E] tracking-tight text-lg">bKash</span>
);

const StripeIcon = () => (
    <span className="font-bold text-[#635BFF] tracking-tight text-lg">stripe</span>
);

const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethodConfig> = {
    bkash: { name: "bKash", label: "bKash Wallet", icon: <BKashIcon /> },
    stripe: { name: "Stripe", label: "Credit / Debit Card", icon: <StripeIcon /> },
};

const PRESET_AMOUNTS = [100, 250, 500, 1000, 2000];

export default function DonatePage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const queryMethod = searchParams.get("method") as PaymentMethodId;
    const currentMethod = PAYMENT_METHODS[queryMethod] ? queryMethod : "bkash";

    // States
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [searchParams]);

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        if (value) {
            setSelectedAmount(null);
        }
    };
    const handlePresetSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount("");
    };

    const displayAmount = selectedAmount !== null ? selectedAmount : (Number(customAmount) || 0);
    const activeMethodConfig = PAYMENT_METHODS[currentMethod];

    return (
        <>
            <HeroNavbar />
            <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen transition-colors duration-200">
                <div className="max-w-6xl mx-auto px-4 py-20 md:py-24">

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* Left & Middle Column: Forms */}
                        <div className="lg:col-span-2 space-y-4">

                            {/* Section 1: Selected Payment Method */}
                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        Payment Method
                                    </h2>
                                </div>
                                {isLoading ? (
                                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl animate-pulse">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                                <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-10 flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
                                                {activeMethodConfig.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium">{activeMethodConfig.label}</h3>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">Selected via checkout</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors cursor-pointer focus:outline-none"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            Change
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Section 2: Donation Amount */}
                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                                        Select Amount
                                    </h2>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Choose a preset amount or enter a custom value.</p>
                                </div>

                                {isLoading ? (
                                    <div className="space-y-6 animate-pulse">
                                        {/* Preset Grid Skeleton */}
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                            {[1, 2, 3, 4, 5].map((idx) => (
                                                <div key={idx} className="h-11 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                            ))}
                                        </div>
                                        {/* Input Skeleton */}
                                        <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Preset Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                            {PRESET_AMOUNTS.map((amount) => {
                                                const isSelected = selectedAmount === amount;
                                                return (
                                                    <button
                                                        key={amount}
                                                        type="button"
                                                        onClick={() => handlePresetSelect(amount)}
                                                        className={`py-3 px-4 rounded-xl font-medium text-sm border cursor-pointer text-center transition-all focus:outline-none
                                                    ${isSelected
                                                                ? "border-indigo-500 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-semibold"
                                                                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent text-slate-600 dark:text-slate-400"
                                                            }
                                                `}
                                                    >
                                                        <span>{currentMethod === "stripe" ? "$" : "৳"}</span>{amount}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Custom Amount Input */}
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">{currentMethod === "stripe" ? "$" : "৳"}</span>
                                            </div>
                                            <input
                                                type="number"
                                                min="10"
                                                placeholder="Enter custom amount"
                                                value={customAmount}
                                                onChange={(e) => handleCustomAmountChange(e.target.value)}
                                                className={`w-full pl-9 pr-4 py-3 bg-transparent border rounded-xl text-sm font-medium placeholder-slate-400 dark:placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                                            ${customAmount
                                                        ? "border-indigo-500 dark:indigo-500 bg-indigo-50/10 dark:bg-indigo-950/5 text-indigo-600 dark:text-indigo-400"
                                                        : "border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 text-slate-900 dark:text-slate-50"
                                                    }
                                        `}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Section 3: Donor Information */}
                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                                        Donor Information
                                    </h2>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Provide your basic info for the payment transaction record.</p>
                                </div>

                                {isLoading ? (
                                    <div className="space-y-4 animate-pulse">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                            <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5" /> Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="you@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                                />
                                            </div>

                                            {/* Name Field */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5" /> Full Name <span className="text-slate-400 dark:text-slate-500">(Optional)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Message Field */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                                <MessageSquare className="w-3.5 h-3.5" /> Short Message <span className="text-slate-400 dark:text-slate-500">(Optional)</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                placeholder="Leave a word of encouragement..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>

                        {/* Right Column: Sticky Donation Summary */}
                        <div className="lg:sticky lg:top-8 space-y-6">

                            {/* Summary Card */}
                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    Donation Summary
                                </h2>

                                {isLoading ? (
                                    <div className="space-y-4 animate-pulse">
                                        <div className="flex justify-between pt-2">
                                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                            <div className="h-4 w-14 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        </div>
                                        <div className="flex justify-between pt-4">
                                            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        </div>
                                        <div className="flex justify-between pt-4">
                                            <div className="h-5 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                            <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        </div>
                                        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-full pt-4"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm space-y-4">
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-slate-400 dark:text-slate-500">Payment Method</span>
                                                <span className="font-medium text-slate-800 dark:text-slate-200">{activeMethodConfig.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-4">
                                                <span className="text-slate-400 dark:text-slate-500">Donation Amount</span>
                                                <span className="font-medium text-slate-800 dark:text-slate-200"> <span>{currentMethod === "stripe" ? "$" : "৳"}</span> {displayAmount}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-4 font-semibold text-base text-slate-900 dark:text-slate-50">
                                                <span>Total</span>
                                                <span className="text-indigo-600 dark:text-indigo-400"> <span>{currentMethod === "stripe" ? "$" : "৳"}</span>{displayAmount}</span>
                                            </div>
                                        </div>

                                        {/* Primary Action Button */}
                                        <button
                                            type="button"
                                            disabled={displayAmount <= 0 || !email}
                                            className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                                        ${displayAmount > 0 && email
                                                    ? "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 cursor-pointer"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                                                }
                                    `}
                                        >
                                            Continue with {activeMethodConfig.name}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Security Footer Card */}
                            <div className="p-4 bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800/60 rounded-xl flex gap-3 items-start">
                                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">Secure Payment</h4>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mt-0.5">
                                        Your payment is encrypted and processed securely. We never store your full financial credentials.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Payment Selector Modal */}
                <PaymentSelectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div >
        </>
    );
}
