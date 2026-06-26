"use client";
import React from "react";
import { Shield, UserCheck, Lightbulb, MessageSquare, Newspaper, XCircle } from "lucide-react";
import Modal from "@/components/ui/modal";

const sections = [
    {
        id: "A",
        icon: UserCheck,
        title: "Account Registration & Security",
        items: [
            "To access the core features of the platform (posting ideas, purchasing, voting, and commenting), you must register for an account.",
            "You agree to provide accurate, current, and complete information during the registration process.",
            "You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        ],
    },
    {
        id: "B",
        icon: Lightbulb,
        title: "Idea Sharing & Intellectual Property",
        items: [
            "Ownership: You retain full ownership of the innovation ideas and content you post on BHAC. By posting, you grant us a worldwide, non-exclusive, royalty-free license to host and display your content on the platform.",
            "Originality: You warrant that any idea or content you share is your own original work or that you have the legal right to share it. Copyright infringement or intellectual property theft is strictly prohibited.",
            "Idea Buying & Selling: When an innovation idea is purchased, the rights to that idea are transferred from the seller to the buyer according to the transaction agreement. BHAC acts solely as a venue and does not guarantee the quality, feasibility, or authenticity of any posted ideas.",
        ],
    },
    {
        id: "C",
        icon: MessageSquare,
        title: "Voting, Comments, and User Conduct",
        items: [
            "Users are encouraged to interact using the Upvote and Downvote system and by leaving constructive comments.",
            "You agree not to post comments that are abusive, defamatory, obscene, profane, or intended to harass other users.",
            "Manipulating the voting system through artificial means, including but not limited to bots, scripts, or multiple fake accounts, is strictly prohibited.",
        ],
    },
    {
        id: "D",
        icon: Newspaper,
        title: "Admin Insights & Tech News",
        items: [
            "The BHAC admin panel regularly publishes technology-related news, articles, and insights.",
            "This content is provided for informational purposes only. BHAC does not guarantee the accuracy of third-party tech news and is not liable for any decisions made based on this information.",
        ],
    },
    {
        id: "E",
        icon: XCircle,
        title: "Termination of Service",
        items: [
            "BHAC reserves the right to suspend or terminate your account and access to the platform at any time, without prior notice, for conduct that we believe violates this agreement or is harmful to other users or our business interests.",
        ],
    },
];

interface UserAgreementProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserAgreement({ isOpen, onClose }: UserAgreementProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="User Agreement"
            animation="bounce"
            size="xl"
        >
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

                {/* Intro banner */}
                <div className="bg-indigo-500 rounded-2xl p-6 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md shrink-0">
                        <Shield className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm">Last Updated: June 2026</p>
                        <p className="text-indigo-100 text-sm mt-1 leading-relaxed">
                            Welcome to BHAC! By accessing or using our website, you agree to be bound by
                            these Terms of Service. If you do not agree with any part of these terms, please do
                            not use our platform.
                        </p>
                    </div>
                </div>

                {/* Sections */}
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <div
                            key={section.id}
                            className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden"
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 dark:border-zinc-800">
                                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg shrink-0">
                                    <Icon className="text-indigo-500 w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md">
                                    {section.id}
                                </span>
                                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                                    {section.title}
                                </h2>
                            </div>

                            {/* Section Items */}
                            <ul className="px-5 py-3.5 space-y-2.5">
                                {section.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2.5">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                                            {item}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 dark:text-zinc-600 pb-2">
                    By continuing to use BHAC, you acknowledge that you have read and agreed to these terms.
                </p>
            </div>
        </Modal>
    );
}
