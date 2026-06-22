/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
    Mail, Calendar, ShieldCheck, User as UserIcon,
    CheckCircle2, BadgeCheck, Star, Edit3, Fingerprint
} from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import UpdateUserProfile from "./UpdateUserProfile";
import { Roles } from "@/constants/Roles";
import { UserStatus } from "@/constants/UserStatus";

export default function UserProfile({ user, onEdit }: { user: any; onEdit?: () => void }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [userData, setUserData] = useState(user);


    useEffect(() => {
        const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/me`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        res.then((response) => response.json()).then((data) => {
            setUserData(data.user);
        });
    }, [user]);
    // console.log(userData)

    const joinDate = user?.createdAt
        ? format(new Date(user.createdAt), "MMMM dd, yyyy")
        : "N/A";

    const defaultCover = userData?.coverPhoto
    const coverImage = user?.coverImage || defaultCover;
    const userHandle = userData?.username ? `@${user.username}` : `@${user?.name?.toLowerCase().replace(/\s+/g, "") || "user"}`;


    return (
        <div className="max-w-5xl mx-auto space-y-8 p-1 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Main Profile Header Card (Facebook Style Layout) */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] overflow-hidden">

                {/* 1. Cover Photo Container */}
                <div className="h-56 md:h-72 relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={coverImage}
                        alt="Profile Cover"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* 2. Info & Action Area (No overlap issue) */}
                <div className="px-6 md:px-10 pb-8 pt-6 relative">

                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">

                        {/* Left Column: Avatar + Profile Identity */}
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">

                            {/* Profile Photo (Positioned halfway using negative top margin properly handled) */}
                            <div className="relative -mt-24 md:-mt-32 z-20">
                                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white dark:border-gray-900 bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-2xl flex items-center justify-center ring-1 ring-black/5">
                                    {user?.image ? (
                                        <Image src={userData.image} alt={user.name} fill className="object-cover rounded-full" />
                                    ) : (
                                        <div className="text-indigo-400/70 dark:text-indigo-500/70"><UserIcon size={72} /></div>
                                    )}
                                </div>
                                {/* Active Indicator Status Dot */}
                                <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full shadow-lg" />
                            </div>

                            {/* Text Information Block */}
                            <div className="space-y-1 md:pb-2">
                                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                                        {userData?.name}
                                    </h1>
                                    {user?.role === Roles.admin && (
                                        <BadgeCheck className="text-indigo-500 dark:text-indigo-400 fill-indigo-500/10" size={24} />
                                    )}
                                </div>

                                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
                                    {userHandle}
                                </p>

                                <p className="text-gray-400 dark:text-gray-500 font-medium text-sm">{userData?.shortBio}</p>

                                {/* Status Badges */}
                                <div className="flex gap-2 pt-2 justify-center md:justify-start">
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-lg gap-x-1.5 border text-[10px] font-black uppercase tracking-wider ${user?.role === "ADMIN"
                                        ? 'text-sky-500 bg-blue-50/50 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40'
                                        : 'text-yellow-600 bg-yellow-50/50 border-yellow-100 dark:bg-yellow-950/40 dark:text-yellow-400 dark:border-yellow-900/40'
                                        }`}>
                                        <span className={`h-1 w-1 rounded-full ${user?.role === Roles.admin ? 'bg-blue-500' : 'bg-green-500'}`} />
                                        {userData?.role}
                                    </div>

                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-lg gap-x-1.5 border text-[10px] font-black uppercase tracking-wider ${user?.status === UserStatus.ACTIVE
                                        ? 'text-emerald-600 bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40'
                                        : 'text-red-600 bg-red-50/50 border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/40'
                                        }`}>
                                        <span className={`h-1 w-1 rounded-full ${user?.status === UserStatus.ACTIVE ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        {userData?.status}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Edit Button (Perfect Facebook Alignment) */}
                        <div className="w-full md:w-auto flex justify-center md:pb-2">
                            <button
                                onClick={() => {
                                    setIsEditOpen(true);
                                    if (onEdit) onEdit();
                                }}
                                className="flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-sm rounded-xl active:scale-95 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 w-full md:w-auto"
                            >
                                <Edit3 size={15} />
                                <span>Edit Profile</span>
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* Grid Layout for Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Card: Trust Matrix */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.2)]">
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Trust Matrix</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30"><Star size={18} /></div>
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Reliability</span>
                            </div>
                            <span className="text-sm font-black text-gray-900 dark:text-white tracking-tight">99%</span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 dark:text-emerald-400 border border-emerald-100/30"><CheckCircle2 size={18} /></div>
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Verification</span>
                            </div>
                            <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${user?.emailVerified ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "text-rose-600 bg-rose-50 dark:bg-rose-950/30"}`}>
                                {user?.emailVerified ? "VERIFIED" : "UNVERIFIED"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Card: Personal Records */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.2)]">
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">Personal Records</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
                        <DetailItem icon={<Mail size={16} />} label="Registered Email" value={user?.email} />
                        <DetailItem icon={<Calendar size={16} />} label="Join Date" value={joinDate} />
                        <DetailItem icon={<ShieldCheck size={16} />} label="Security Vault State" value={user?.needPasswordChange ? "Action Mandatory" : "Encrypted & Secure"} />
                        <DetailItem icon={<Fingerprint size={16} />} label="Internal Registry Token" value={`ID-${user?.id?.slice(-10).toUpperCase() || 'NULL'}`} />
                    </div>
                </div>

            </div>
            <UpdateUserProfile userData={userData} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
        </div>
    );
}

function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4 group p-1">
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/80 text-indigo-500 dark:text-indigo-400 rounded-2xl border border-gray-100/80 dark:border-gray-700/80 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-950/30 transition-all duration-300 shadow-sm">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">{label}</p>
                <p className="text-sm font-black text-gray-800 dark:text-gray-200 break-all tracking-tight">{value}</p>
            </div>
        </div>
    );
}