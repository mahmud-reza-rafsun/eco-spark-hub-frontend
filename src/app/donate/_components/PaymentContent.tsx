"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, RefreshCw, Mail, User, MessageSquare } from "lucide-react";
import PaymentSelectModal, { bKashIcon, stripeIcon } from "./PaymentModal";
import HeroNavbar from "@/app/_components/HeroNavbar";
import CheckoutModal from "./CheckoutModal";

type PaymentMethodId = "bkash" | "stripe";

interface PaymentMethodConfig {
    name: string;
    label: string;
    icon: React.ReactNode;
}

const BKashIcon = () => (
    bKashIcon()
);

const StripeIcon = () => (
    stripeIcon()
);

const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethodConfig> = {
    bkash: { name: "bKash", label: "bKash Wallet", icon: <BKashIcon /> },
    stripe: { name: "Stripe", label: "Credit / Debit Card", icon: <StripeIcon /> },
};

const PRESET_AMOUNTS = [100, 250, 500, 1000, 2000];

export default function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isCheckOutOpen, setIsCheckoutOpen] = useState(false);

    const queryMethod = searchParams.get("method") as PaymentMethodId;
    const currentMethod = PAYMENT_METHODS[queryMethod] ? queryMethod : "bkash";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

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

    // Check if the form is valid (Amount > 0 AND Email exists AND Name exists)
    const isFormValid = displayAmount > 0 && email.trim() !== "" && name.trim() !== "";

    return (
        <>
            <HeroNavbar />
            <div className=" bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-200">
                <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                        Payment Method
                                    </h2>
                                </div>
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
                            </div>

                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                                        Select Amount
                                    </h2>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Choose a preset amount or enter a custom value.</p>
                                </div>

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
                                                ? "border-indigo-500 dark:border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/5 text-indigo-600 dark:text-indigo-400"
                                                : "border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 text-slate-900 dark:text-slate-50"
                                            }
                                    `}
                                    />
                                </div>
                            </div>

                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                                        Donor Information <span className="text-red-500">*</span>
                                    </h2>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Provide your basic info for the payment transaction record.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" /> Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5" /> Short Message
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Leave a word of encouragement..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="lg:sticky lg:top-8 space-y-6">
                            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    Donation Summary
                                </h2>

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

                                <button
                                    type="button"
                                    disabled={!isFormValid}
                                    onClick={() => setIsCheckoutOpen(true)}
                                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                                    ${isFormValid
                                            ? "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 cursor-pointer"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                                        }
                                `}
                                >
                                    Continue with {activeMethodConfig.name}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

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

                <PaymentSelectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
            <CheckoutModal
                isOpen={isCheckOutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onConfirm={() => {
                    setIsCheckoutOpen(false);
                    router.push(`/donate/checkout?method=${currentMethod}&amount=${displayAmount}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`);
                }}
            />
        </>
    );
}
