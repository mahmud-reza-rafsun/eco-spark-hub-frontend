import { useState } from "react";
import TrendingIdeas from "../modules/TrendingIdeas/TrendingIdea";
import UserAgreement from "../modules/Document/UserAgreement";
import PrivacyPolicy from "../modules/Document/PrivacyPolicy";

export default function RightSideBar() {
    const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
    const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);
    return (
        <aside
            className="fixed right-0 top-16 h-[calc(100vh-64px)] w-[320px] border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#09090b] z-40"
        >
            <div className="flex flex-col h-full py-6 px-4 overflow-x-hidden justify-between">
                <div>
                    <TrendingIdeas />
                </div>

                <div className="mb-4">
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4 px-2 text-[12px] text-gray-500 space-y-2">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                            <p onClick={() => setIsAgreementModalOpen(true)}
                                className="hover:underline cursor-pointer">
                                User Agreement
                            </p>
                            <p onClick={() => setIsPrivacyPolicyModalOpen(true)}
                                className="hover:underline cursor-pointer">
                                Privacy Policy
                            </p>
                        </div>
                        <p>© 2026 EcoSpark Hub, Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <UserAgreement isOpen={isAgreementModalOpen}
                onClose={() => setIsAgreementModalOpen(false)} />
            <PrivacyPolicy isOpen={isPrivacyPolicyModalOpen}
                onClose={() => setIsPrivacyPolicyModalOpen(false)} />
        </aside>
    )
}