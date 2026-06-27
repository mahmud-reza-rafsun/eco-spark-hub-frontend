import { Suspense } from "react";
import PaymentContent from "./_components/PaymentContent";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#09090B] py-20">
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-[300px] text-gray-500">
                    Loading payment details...
                </div>
            }>
                <PaymentContent />
            </Suspense>
        </div>
    );
}
