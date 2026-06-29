"use client";

import Modal from '@/components/ui/modal';
import { useState } from "react";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (selectedMethod: string) => void;
}

// --- Official bKash SVG Icon ---
export const bKashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="48" height="22" viewBox="0 0 122 54" className="text-[#E2136E] fill-current">
        <g>
            <path d="m82.9 25.9 3.3 14.6 21.5-10.7zM89 3.8 83.2 25l24 3.8zM62.8.6l25.5 3.1-6 21.8zM62.5 4.8h3l8 10.3zM108.4 29.6l-7.5-10.3 12-2.3zM107.2 32.5l.7-2.2-18.7 9.6zM82.4 26.3 86.3 44l-11.6 9.4zM111.8 22.3h7l-5.1-5.1z"></path>
        </g>
        <path d="M5.4 21.2h15.2v2.2H5.2v17.8s-.7-.1-1.1-.1c-.4 0-.9.1-.9.1V21.1c0-5.2 2-8.2 7-8.5 4.5-.3 8 2.3 10.4 3.6v2.6l-.3.1c-.4-1-5.8-5.5-9.3-5.1-3.6.4-5.8 2.9-5.8 6.2 0 0 0 .9.2 1.2z"></path>
        <path d="M36.6 24.9c3.8-.1 5.7 1.2 5.8 4.1.1 1.6-.6 3.1-1.7 4.4l-1.9.1v-.3c.7-.2 2.3-1.3 2.2-3.3s-1.6-3.6-4-3.5c0 0-.4 0-.6.1l.2-1.6z"></path>
        <path d="M18.5 23h2.1v18.2l-2.1-.7z"></path>
        <path d="M57.3 25.5c-.8-2.7-3.1-4.3-4.8-4.3H48v2.2h3c1.3 0 2.6-.1 3.8 1 .5.5.7 1 .9 1.7.4 1.7-.4 3.8-2.4 3.8-.6 0-1.3 0-1.9-.2v.1c.5.6.8 1.4 1.2 2.1 1.2-.2 2.4-.9 3.2-1.7 1.1-1.3 1.8-2.9 1.5-4.7"></path>
        <path d="M60.6 21.5c-1.3.2-3.3 1.3-4 4.1-.2 1.8.3 3.4 1.5 4.6.7.8 1.8 1.5 2.8 1.7.3-.7.7-1.4 1.1-2.1l-.1-.1c-.5.2-1.1.2-1.7.2-2.1-.1-2.4-2.2-2.1-3.8.3-1.4 1.5-2.8 2.8-2.9 1.4-.1 3.1 1 3.4 2.5.2.8.2 1.6.2 2.4v13.2s.6-.1 1-.1 1 .1 1 .1V21.4h-2.2v2.2c0-.1.1-.1 0-.3-.7-1.3-2.5-2-3.7-1.8M47.6 21.2v20s-.6-.1-1-.1-1 .1-1 .1V23.4H21.1v-2.2h26.5z"></path>
        <path d="M20.6 41.2h-.3c-7.8 0-12.2-4.3-12.2-8.6 0-3.6 3.3-7.8 10.9-7.8l1.3 1c-5.3 0-9.6 3.4-9.6 6.8 0 3 3.8 7.8 9.9 7.8v.8z"></path>
        <path d="M34.8 23h2.1v18.2l-2.1-.7z"></path>
        <path d="M36.9 41.2h-.3c-7.8 0-12.2-4.3-12.2-8.6 0-3.6 3.3-7.8 10.9-7.8l1.3 1c-5.3 0-9.6 3.4-9.6 6.8 0 3 3.8 7.8 9.9 7.8v.8z"></path>
    </svg>
);

export default function CheckoutModal({ isOpen, onClose, onConfirm }: PaymentSelectModalProps) {
    const [step, setStep] = useState<1 | 2>(1); // Step 1: bKash Form, Step 2: Success State
    const [senderNumber, setSenderNumber] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    if (!isOpen) return null;

    const handlebKashSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!senderNumber || !transactionId) return;

        setIsSubmitting(true);

        // Verification delay simulation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setStep(2); // Switch to success UI

        // Redirect after 3 seconds
        setTimeout(() => {
            if (onConfirm) {
                onConfirm("bkash");
            }
            onClose();
            setStep(1);
            setSenderNumber("");
            setTransactionId("");
            router.push(`/donate/success?method=bkash&trx=${transactionId}&phone=${senderNumber}`);
        }, 3000);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                if (step !== 2) {
                    onClose();
                }
            }}
            title={step === 1 ? "bKash Manual Payment" : "Payment Status"}
            size="md"
        >
            <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-900 z-10 transition-all duration-300 ease-out">

                {/* --- STEP 1: BKASH MANUAL FORM --- */}
                {step === 1 && (
                    <form onSubmit={handlebKashSubmit}>
                        <div className="p-6 pt-2 space-y-5">

                            {/* Top centered logo container */}
                            <div className="flex flex-col items-center justify-center p-5 bg-pink-50/40 dark:bg-pink-950/10 rounded-2xl border border-pink-100/70 dark:border-pink-900/20">
                                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                                    {bKashIcon()}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">Manual Transfer Verification</p>
                            </div>

                            {/* Payment details block */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 text-sm space-y-2.5">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400">Method Type:</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">Send Money</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400">Our bKash Number:</span>
                                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base select-all tracking-wider">
                                        01628745520
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200/50 dark:border-slate-800 text-center leading-relaxed">
                                    Please send the donation amount to the personal bKash number listed above, then fill out the fields below.
                                </p>
                            </div>

                            {/* Inputs form section */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                        Your bKash Number
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="01XXXXXXXXX"
                                        value={senderNumber}
                                        onChange={(e) => setSenderNumber(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                        Transaction ID (TrxID)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. BAX78K92L1"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm uppercase placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 cursor-pointer dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !senderNumber || !transactionId}
                                className={`
                                    px-5 py-2.5 text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                                    ${!senderNumber || !transactionId || isSubmitting
                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                                        : "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 cursor-pointer"
                                    }
                                `}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Confirm Payment"
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* --- STEP 2: SUCCESS ANIMATION STATE --- */}
                {step === 2 && (
                    <div className="p-10 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-300">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-950/40 animate-ping opacity-75 duration-1000" />
                            <div className="relative w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Sparkles className="w-8 h-8 animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                Payment Complete
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                Your statement is recorded successfully. Redirecting you to the confirmation invoice page...
                            </p>
                        </div>

                        <div className="w-24 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full w-full origin-left transition-all duration-[3000ms] ease-out" />
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}


// "use client";

// import Modal from '@/components/ui/modal';
// import { useState } from "react";
// import { CheckCircle2, Globe, MapPin, ArrowLeft, Loader2, Sparkles } from "lucide-react";
// import { useRouter } from "next/navigation";

// // --- Types ---
// interface PaymentOption {
//     id: string;
//     name: string;
//     description: string;
//     icon: React.ReactNode;
// }

// interface PaymentGroup {
//     category: string;
//     icon: React.ReactNode;
//     options: PaymentOption[];
// }

// interface PaymentSelectModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirm?: (selectedMethod: string) => void;
// }

// // --- Official SVG Icons Components ---
// export const bKashIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="48" height="22" viewBox="0 0 122 54" className="text-[#E2136E] fill-current">
//         <g>
//             <path d="m82.9 25.9 3.3 14.6 21.5-10.7zM89 3.8 83.2 25l24 3.8zM62.8.6l25.5 3.1-6 21.8zM62.5 4.8h3l8 10.3zM108.4 29.6l-7.5-10.3 12-2.3zM107.2 32.5l.7-2.2-18.7 9.6zM82.4 26.3 86.3 44l-11.6 9.4zM111.8 22.3h7l-5.1-5.1z"></path>
//         </g>
//         <path d="M5.4 21.2h15.2v2.2H5.2v17.8s-.7-.1-1.1-.1c-.4 0-.9.1-.9.1V21.1c0-5.2 2-8.2 7-8.5 4.5-.3 8 2.3 10.4 3.6v2.6l-.3.1c-.4-1-5.8-5.5-9.3-5.1-3.6.4-5.8 2.9-5.8 6.2 0 0 0 .9.2 1.2z"></path>
//         <path d="M36.6 24.9c3.8-.1 5.7 1.2 5.8 4.1.1 1.6-.6 3.1-1.7 4.4l-1.9.1v-.3c.7-.2 2.3-1.3 2.2-3.3s-1.6-3.6-4-3.5c0 0-.4 0-.6.1l.2-1.6z"></path>
//         <path d="M18.5 23h2.1v18.2l-2.1-.7z"></path>
//         <path d="M57.3 25.5c-.8-2.7-3.1-4.3-4.8-4.3H48v2.2h3c1.3 0 2.6-.1 3.8 1 .5.5.7 1 .9 1.7.4 1.7-.4 3.8-2.4 3.8-.6 0-1.3 0-1.9-.2v.1c.5.6.8 1.4 1.2 2.1 1.2-.2 2.4-.9 3.2-1.7 1.1-1.3 1.8-2.9 1.5-4.7"></path>
//         <path d="M60.6 21.5c-1.3.2-3.3 1.3-4 4.1-.2 1.8.3 3.4 1.5 4.6.7.8 1.8 1.5 2.8 1.7.3-.7.7-1.4 1.1-2.1l-.1-.1c-.5.2-1.1.2-1.7.2-2.1-.1-2.4-2.2-2.1-3.8.3-1.4 1.5-2.8 2.8-2.9 1.4-.1 3.1 1 3.4 2.5.2.8.2 1.6.2 2.4v13.2s.6-.1 1-.1 1 .1 1 .1V21.4h-2.2v2.2c0-.1.1-.1 0-.3-.7-1.3-2.5-2-3.7-1.8M47.6 21.2v20s-.6-.1-1-.1-1 .1-1 .1V23.4H21.1v-2.2h26.5z"></path>
//         <path d="M20.6 41.2h-.3c-7.8 0-12.2-4.3-12.2-8.6 0-3.6 3.3-7.8 10.9-7.8l1.3 1c-5.3 0-9.6 3.4-9.6 6.8 0 3 3.8 7.8 9.9 7.8v.8z"></path>
//         <path d="M34.8 23h2.1v18.2l-2.1-.7z"></path>
//         <path d="M36.9 41.2h-.3c-7.8 0-12.2-4.3-12.2-8.6 0-3.6 3.3-7.8 10.9-7.8l1.3 1c-5.3 0-9.6 3.4-9.6 6.8 0 3 3.8 7.8 9.9 7.8v.8z"></path>
//     </svg>
// );

// export const stripeIcon = () => (
//     <svg viewBox="0 0 100 36" width="64" height="24" xmlns="http://www.w3.org/2000/svg" aria-label="Stripe" className="text-[#635BFF] fill-current">
//         <rect x="0" y="4" width="28" height="28" rx="6" fill="#635BFF" />
//         <text x="5" y="24" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="900" fill="white">S</text>
//         <text x="34" y="25" fontFamily="-apple-system, BlinkMacSystemFont, Arial, sans-serif" fontSize="18" fontWeight="600" fill="#635BFF" className="dark:fill-white">stripe</text>
//     </svg>
// );

// // --- Static Data ---
// const paymentGroups: PaymentGroup[] = [
//     {
//         category: "Bangladesh",
//         icon: <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />,
//         options: [
//             { id: "bkash", name: "bKash", description: "Pay manually using your bKash wallet", icon: bKashIcon() },
//         ],
//     },
//     {
//         category: "International",
//         icon: <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" />,
//         options: [
//             { id: "stripe", name: "Stripe", description: "All major credit and debit cards accepted", icon: stripeIcon() },
//         ],
//     },
// ];

// export default function CheckoutModal({ isOpen, onClose, onConfirm }: PaymentSelectModalProps) {
//     const [step, setStep] = useState<1 | 2 | 3>(1); // Step 1: Select Method, Step 2: bKash Form, Step 3: Success State
//     const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
//     const [senderNumber, setSenderNumber] = useState("");
//     const [transactionId, setTransactionId] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const router = useRouter();

//     if (!isOpen) return null;

//     const handleContinue = () => {
//         if (!selectedMethod) return;

//         if (selectedMethod === "bkash") {
//             setStep(2);
//         } else if (selectedMethod === "stripe") {
//             // Directly trigger callback for Stripe without showing second step modal
//             if (onConfirm) onConfirm(selectedMethod);
//             onClose();
//         }
//     };

//     const handlebKashSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!senderNumber || !transactionId) return;

//         setIsSubmitting(true);

//         // Simulate local submission/verification delay
//         await new Promise((resolve) => setTimeout(resolve, 1500));

//         setIsSubmitting(false);
//         setStep(3); // Switch to success UI inside modal

//         // Redirect after showing completion screen for 3 seconds
//         setTimeout(() => {
//             if (onConfirm) {
//                 onConfirm(selectedMethod!);
//             }
//             onClose();
//             setStep(1);
//             setSenderNumber("");
//             setTransactionId("");
//             router.push(`/donate/success?method=bkash&trx=${transactionId}&phone=${senderNumber}`);
//         }, 3000);
//     };

//     // Determine modal title dynamically based on steps
//     const getModalTitle = () => {
//         if (step === 1) return "Choose Payment Method";
//         if (step === 2) return "bKash Manual Payment";
//         return "Payment Status";
//     };

//     return (
//         <Modal
//             isOpen={isOpen}
//             onClose={() => {
//                 if (step !== 3) {
//                     setStep(1);
//                     onClose();
//                 }
//             }}
//             title={getModalTitle()}
//             size="md"
//         >
//             <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-900 z-10 transition-all duration-300 ease-out">

//                 {/* --- STEP 1: SELECT METHOD --- */}
//                 {step === 1 && (
//                     <>
//                         <div className="p-6 pt-2 space-y-6">
//                             {paymentGroups.map((group) => (
//                                 <div key={group.category} className="space-y-3">
//                                     <div className="flex items-center gap-2 px-1">
//                                         {group.icon}
//                                         <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
//                                             {group.category}
//                                         </span>
//                                     </div>

//                                     <div className="grid gap-2.5">
//                                         {group.options.map((option) => {
//                                             const isSelected = selectedMethod === option.id;
//                                             return (
//                                                 <label
//                                                     key={option.id}
//                                                     className={`
//                                                         relative flex items-center gap-4 p-4 rounded-xl border cursor-pointer select-none transition-all duration-200
//                                                         focus-within:ring-2 focus-within:ring-indigo-500/40
//                                                         ${isSelected
//                                                             ? "bg-indigo-50/40 dark:bg-indigo-950/10 border-indigo-500 dark:border-indigo-500"
//                                                             : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
//                                                         }
//                                                     `}
//                                                 >
//                                                     <input
//                                                         type="radio"
//                                                         name="payment-method"
//                                                         value={option.id}
//                                                         checked={isSelected}
//                                                         onChange={() => setSelectedMethod(option.id)}
//                                                         className="sr-only"
//                                                     />

//                                                     <div className="flex-shrink-0 w-16 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/50">
//                                                         {option.icon}
//                                                     </div>

//                                                     <div className="flex-1 min-w-0 pr-6">
//                                                         <span className="block text-sm font-semibold text-slate-900 dark:text-slate-50">
//                                                             {option.name}
//                                                         </span>
//                                                         <span className="block mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
//                                                             {option.description}
//                                                         </span>
//                                                     </div>

//                                                     <div className="absolute right-4 flex-shrink-0">
//                                                         <div
//                                                             className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${isSelected
//                                                                 ? "border-indigo-500 bg-indigo-500 text-white scale-100"
//                                                                 : "border-slate-300 dark:border-slate-700 bg-transparent scale-90"
//                                                                 }`}
//                                                         >
//                                                             {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
//                                                         </div>
//                                                     </div>
//                                                 </label>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Footer */}
//                         <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={onClose}
//                                 className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 cursor-pointer dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors focus:outline-none"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleContinue}
//                                 disabled={!selectedMethod}
//                                 className={`
//                                     px-5 py-2 text-sm font-medium cursor-pointer rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40
//                                     ${selectedMethod
//                                         ? "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700"
//                                         : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
//                                     }
//                                 `}
//                             >
//                                 Continue
//                             </button>
//                         </div>
//                     </>
//                 )}

//                 {/* --- STEP 2: BKASH MANUAL FORM --- */}
//                 {step === 2 && (
//                     <form onSubmit={handlebKashSubmit}>
//                         <div className="p-6 pt-2 space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">

//                             {/* Top centered logo container */}
//                             <div className="flex flex-col items-center justify-center p-5 bg-pink-50/40 dark:bg-pink-950/10 rounded-2xl border border-pink-100/70 dark:border-pink-900/20">
//                                 <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
//                                     {bKashIcon()}
//                                 </div>
//                                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">Manual Transfer Verification</p>
//                             </div>

//                             {/* Payment details block */}
//                             <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-gray-800 text-sm space-y-2.5">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-slate-500 dark:text-slate-400">Method Type:</span>
//                                     <span className="font-semibold text-slate-800 dark:text-slate-200">Send Money</span>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-slate-500 dark:text-slate-400">Our bKash Number:</span>
//                                     <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base select-all tracking-wider">
//                                         01628745520
//                                     </span>
//                                 </div>
//                                 <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200/50 dark:border-slate-800 text-center leading-relaxed">
//                                     Please send the donation amount to the personal bKash number listed above, then fill out the fields below.
//                                 </p>
//                             </div>

//                             {/* Inputs form section */}
//                             <div className="space-y-4">
//                                 <div className="space-y-1.5">
//                                     <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
//                                         Your bKash Number
//                                     </label>
//                                     <input
//                                         type="text"
//                                         required
//                                         placeholder="01XXXXXXXXX"
//                                         value={senderNumber}
//                                         onChange={(e) => setSenderNumber(e.target.value)}
//                                         className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
//                                     />
//                                 </div>

//                                 <div className="space-y-1.5">
//                                     <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
//                                         Transaction ID (TrxID)
//                                     </label>
//                                     <input
//                                         type="text"
//                                         required
//                                         placeholder="e.g. BAX78K92L1"
//                                         value={transactionId}
//                                         onChange={(e) => setTransactionId(e.target.value)}
//                                         className="w-full px-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-300 dark:focus:border-slate-700 rounded-xl text-sm uppercase placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Step 2 Form Footer */}
//                         <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => setStep(1)}
//                                 className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus:outline-none"
//                             >
//                                 <ArrowLeft className="w-4 h-4" />
//                                 Back
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting || !senderNumber || !transactionId}
//                                 className={`
//                                     px-5 py-2.5 text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40
//                                     ${!senderNumber || !transactionId || isSubmitting
//                                         ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
//                                         : "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 cursor-pointer"
//                                     }
//                                 `}
//                             >
//                                 {isSubmitting ? (
//                                     <>
//                                         <Loader2 className="w-4 h-4 animate-spin" />
//                                         Verifying...
//                                     </>
//                                 ) : (
//                                     "Confirm Payment"
//                                 )}
//                             </button>
//                         </div>
//                     </form>
//                 )}

//                 {/* --- STEP 3: SUCCESS ANIMATION STATE --- */}
//                 {step === 3 && (
//                     <div className="p-10 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-300">
//                         <div className="relative flex items-center justify-center">
//                             <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-950/40 animate-ping opacity-75 duration-1000" />
//                             <div className="relative w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
//                                 <Sparkles className="w-8 h-8 animate-pulse" />
//                             </div>
//                         </div>

//                         <div className="space-y-1.5">
//                             <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
//                                 Payment Complete
//                             </h3>
//                             <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
//                                 Your statement is recorded successfully. Redirecting you to the confirmation invoice page...
//                             </p>
//                         </div>

//                         <div className="w-24 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                             <div className="h-full bg-emerald-500 rounded-full animate-infinite dynamic-loading progress-bar-fill w-full origin-left transition-all duration-[3000ms] ease-out" style={{ animationName: 'shrink', width: '100%' }} />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Modal>
//     );
// }
