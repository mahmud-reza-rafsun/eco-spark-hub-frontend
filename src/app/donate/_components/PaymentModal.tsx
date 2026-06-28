"use client";

import Modal from '@/components/ui/modal';
import { useState, useId } from "react";
import { CheckCircle2, Globe, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types ---
interface PaymentOption {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
}

interface PaymentGroup {
    category: string;
    icon: React.ReactNode;
    options: PaymentOption[];
}

interface PaymentSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (selectedMethod: string) => void;
}

// --- Official SVG Icons Components ---
export const bKashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="88" height="40" viewBox="0 0 122 54">
        <title>bKash Logo</title>
        <g fill="currentColor">
            <path d="m82.9 25.9 3.3 14.6 21.5-10.7zM89 3.8 83.2 25l24 3.8zM62.8.6l25.5 3.1-6 21.8zM62.5 4.8h3l8 10.3zM108.4 29.6l-7.5-10.3 12-2.3zM107.2 32.5l.7-2.2-18.7 9.6zM82.4 26.3 86.3 44l-11.6 9.4zM111.8 22.3h7l-5.1-5.1z"></path>
        </g>
        <path fill="currentColor" d="M5.4 21.2h15.2v2.2H5.2v17.8s-.7-.1-1.1-.1c-.4 0-.9.1-.9.1V21.1c0-5.2 2-8.2 7-8.5 4.5-.3 8 2.3 10.4 3.6v2.6l-.3.1c-.4-1-5.8-5.5-9.3-5.1-3.6.4-5.8 2.9-5.8 6.2 0 0 0 .9.2 1.2z"></path>
        <path fill="currentColor" d="M36.6 24.9c3.8-.1 5.7 1.2 5.8 4.1.1 1.6-.6 3.1-1.7 4.4l-1.9.1v-.3c.7-.2 2.3-1.3 2.2-3.3s-1.6-3.6-4-3.5c0 0-.4 0-.6.1l.2-1.6z"></path>
        <path fill="currentColor" d="M18.5 23h2.1v18.2l-2.1-.7z"></path>
        <path fill="currentColor" d="M57.3 25.5c-.8-2.7-3.1-4.3-4.8-4.3H48v2.2h3c1.3 0 2.6-.1 3.8 1 .5.5.7 1 .9 1.7.4 1.7-.4 3.8-2.4 3.8-.6 0-1.3 0-1.9-.2v.1c.5.6.8 1.4 1.2 2.1 1.2-.2 2.4-.9 3.2-1.7 1.1-1.3 1.8-2.9 1.5-4.7"></path>
        <path fill="currentColor" d="M60.6 21.5c-1.3.2-3.3 1.3-4 4.1-.2 1.8.3 3.4 1.5 4.6.7.8 1.8 1.5 2.8 1.7.3-.7.7-1.4 1.1-2.1l-.1-.1c-.5.2-1.1.2-1.7.2-2.1-.1-2.4-2.2-2.1-3.8.3-1.4 1.5-2.8 2.8-2.9 1.4-.1 3.1 1 3.4 2.5.2.8.2 1.6.2 2.4v13.2s.6-.1 1-.1 1 .1 1 .1V21.4h-2.2v2.2c0-.1.1-.1 0-.3-.7-1.3-2.5-2-3.7-1.8M47.6 21.2v20s-.6-.1-1-.1-1 .1-1 .1V23.4H21.1v-2.2h26.5z"></path>
        <path fill="currentColor" d="M20.6 41.2h-.3c-7.8 0-12.2-4.3-12.2-8.6 0-3.6 3.3-7.8 10.9-7.8l1.3 1c-5.3 0-9.6 3.4-9.6 6.8 0 3 3.8 7.8 9.9 7.8v.8z"></path>
        <path fill="currentColor" d="M34.8 23h2.1v18.2l-2.1-.7z"></path>
        <path fill="currentColor" d="M36.9 41.2h-.3c-7.8 0-12.2-4.3-12.2-8.6 0-3.6 3.3-7.8 10.9-7.8l1.3 1c-5.3 0-9.6 3.4-9.6 6.8 0 3 3.8 7.8 9.9 7.8v.8z"></path>
    </svg>
);

export const stripeIcon = () => (
    <svg viewBox="0 0 100 36" width="100" height="36" xmlns="http://www.w3.org/2000/svg" aria-label="Stripe">
        <rect x="0" y="4" width="28" height="28" rx="6" fill="#635BFF" />
        <text x="5" y="24" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="900" fill="white">S</text>
        <text x="34" y="25" fontFamily="-apple-system, BlinkMacSystemFont, Arial, sans-serif" fontSize="18" fontWeight="600" fill="#635BFF" className="dark:fill-white">stripe</text>
    </svg>
);


// --- Static Data ---
const paymentGroups: PaymentGroup[] = [
    {
        category: "Bangladesh",
        icon: <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />,
        options: [
            { id: "bkash", name: "bKash", description: "Pay instantly using your bKash wallet", icon: bKashIcon() },
        ],
    },
    {
        category: "International",
        icon: <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" />,
        options: [
            { id: "stripe", name: "Stripe", description: "All major credit and debit cards accepted", icon: stripeIcon() },
        ],
    },
];

export default function PaymentSelectModal({ isOpen, onClose, onConfirm }: PaymentSelectModalProps) {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const headingId = useId();
    const router = useRouter();

    if (!isOpen) return null;

    const handleContinue = () => {
        if (!selectedMethod) return;

        if (onConfirm) {
            onConfirm(selectedMethod);
        }

        onClose();
        router.push(`/donate?method=${selectedMethod}`);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Choose Payment Method"
            size="md">
            {/* Modal Content with Scale + Fade Animation */}
            <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-900 z-10 transition-all duration-300 ease-out animate-in fade-in zoom-in-95">

                {/* Body / Options List */}
                <div className="p-6 pt-2 space-y-6">
                    {paymentGroups.map((group) => (
                        <div key={group.category} className="space-y-3">
                            {/* Category Header */}
                            <div className="flex items-center gap-2 px-1">
                                {group.icon}
                                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                    {group.category}
                                </span>
                            </div>

                            {/* Options Grid */}
                            <div className="grid gap-2.5">
                                {group.options.map((option) => {
                                    const isSelected = selectedMethod === option.id;
                                    return (
                                        <label
                                            key={option.id}
                                            className={`
                        relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer select-none transition-all duration-200
                        focus-within:ring-2 focus-within:ring-indigo-500/40
                        ${isSelected
                                                    ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 dark:border-indigo-500"
                                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                                }
                      `}
                                        >
                                            {/* Hidden Radio Input for Accessibility */}
                                            <input
                                                type="radio"
                                                name="payment-method"
                                                value={option.id}
                                                checked={isSelected}
                                                onChange={() => setSelectedMethod(option.id)}
                                                className="sr-only"
                                            />

                                            {/* Icon Container */}
                                            <div className="flex-shrink-0 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                                {option.icon}
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1 min-w-0 pr-4">
                                                <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                                                    {option.name}
                                                </span>
                                                <span className="block mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                                    {option.description}
                                                </span>
                                            </div>

                                            {/* Active State Check Circle */}
                                            <div className="absolute top-4 right-4 flex-shrink-0">
                                                <div
                                                    className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${isSelected
                                                        ? "border-indigo-500 bg-indigo-500 text-white scale-100"
                                                        : "border-slate-300 dark:border-slate-700 bg-transparent scale-90"
                                                        }`}
                                                >
                                                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                                                </div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 cursor-pointer dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 active:bg-slate-100 dark:active:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={!selectedMethod}
                        className={`
              px-5 py-2 text-sm font-medium cursor-pointer rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40
              ${selectedMethod
                                ? "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 shadow-sm shadow-indigo-500/10"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                            }
            `}
                    >
                        Continue
                    </button>
                </div>

            </div>
        </Modal>
    );
}
