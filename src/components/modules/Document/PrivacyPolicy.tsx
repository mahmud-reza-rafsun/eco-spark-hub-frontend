"use client";
import React from "react";
import { Lock, User, BarChart2, Share2, ShieldCheck, Cookie } from "lucide-react";
import Modal from "@/components/ui/modal";

const sections = [
    {
        id: "A",
        icon: User,
        title: "Information We Collect",
        items: [
            "Account Information: Name, email address, profile picture (optional), and encrypted password.",
            "Transaction Data: When you buy or sell an idea, we collect details related to the transaction. Note: We do not directly store sensitive payment card details; all financial transactions are processed securely through authorized third-party payment gateways.",
            "Activity Logs: Information about the ideas you post, your comments, your Upvote/Downvote history, and your interactions with our Tech News section.",
        ],
    },
    {
        id: "B",
        icon: BarChart2,
        title: "How We Use Your Information",
        items: [
            "Provide, maintain, and improve the features of EcoSpark Hub.",
            "Facilitate secure transactions between buyers and sellers of innovation ideas.",
            "Monitor and detect fraudulent activities, ensuring platform security.",
            "Send you important administrative updates, notifications, and curated tech news.",
        ],
    },
    {
        id: "C",
        icon: Share2,
        title: "Data Sharing and Disclosure",
        items: [
            "Buyer-Seller Communication: To complete a successful idea purchase, necessary contact or transaction information may be shared between the involved buyer and seller.",
            "Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.",
            "No Third-Party Selling: We do not sell, rent, or lease your personal identification information to third-party marketing agencies.",
        ],
    },
    {
        id: "D",
        icon: ShieldCheck,
        title: "Data Security",
        items: [
            "We implement standard security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
        ],
    },
    {
        id: "E",
        icon: Cookie,
        title: "Cookies",
        items: [
            "EcoSpark Hub uses cookies to enhance your browsing experience, remember your preferences, and keep you logged into your session. You can choose to disable cookies through your browser settings, though some features of the site may not function properly as a result.",
        ],
    },
];

interface PrivacyPolicyProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Privacy Policy"
            animation="bounce"
            size="xl"
        >
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

                {/* Intro banner */}
                <div className="bg-indigo-500 rounded-2xl p-6 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md shrink-0">
                        <Lock className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm">Last Updated: June 2026</p>
                        <p className="text-indigo-100 text-sm mt-1 leading-relaxed">
                            At EcoSpark Hub, we are committed to protecting your privacy. This Privacy Policy
                            explains how we collect, use, and safeguard your personal information.
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
                    By continuing to use EcoSpark Hub, you acknowledge that you have read and agreed to this Privacy Policy.
                </p>
            </div>
        </Modal>
    );
}