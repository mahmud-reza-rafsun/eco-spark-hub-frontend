/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Mail, Calendar, ShieldCheck, User as UserIcon, CheckCircle2, BadgeCheck, Star } from "lucide-react";
import { format } from "date-fns";

export default function UserProfile({ user }: { user: any }) {
    const joinDate = user?.createdAt
        ? format(new Date(user.createdAt), "MMMM dd, yyyy")
        : "N/A";

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Top Profile Card */}
            <div className="relative bg-white dark:bg-[#161617] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {/* Indigo Banner */}
                <div className="h-44 bg-indigo-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700"></div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <svg width="100%" height="100%"><pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern><rect width="100%" height="100%" fill="url(#pattern)" /></svg>
                    </div>
                </div>

                <div className="px-6 md:px-10 pb-10">
                    <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end -mt-16 gap-6">
                        {/* Avatar & Info */}
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                            <div className="relative">
                                <div className="w-36 h-36 rounded-[2.5rem] border-[6px] border-white dark:border-[#161617] bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-xl flex items-center justify-center">
                                    {user?.image ? (
                                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                                    ) : (
                                        <div className="text-indigo-200"><UserIcon size={60} /></div>
                                    )}
                                </div>
                                {/* Active Dot on Avatar */}
                                <div className="absolute bottom-3 right-3 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-[#161617] rounded-full"></div>
                            </div>

                            <div className="pb-2">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
                                        {user?.name}
                                    </h1>
                                    {user?.role === "ADMIN" && <BadgeCheck className="text-indigo-500" size={24} />}
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">{user?.email}</p>
                            </div>
                        </div>

                        {/* Modern Status & Role Badges Section */}
                        <div className="flex gap-3 mb-2">
                            <div className={`inline-flex items-center px-4 py-1.5 rounded-xl gap-x-2 border shadow-sm
                                ${user?.role === "ADMIN"
                                    ? 'text-blue-600 bg-blue-100 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50'
                                    : 'text-amber-600 bg-amber-100 border-amber-100 dark:bg-yellow-500/30 dark:text-amber-400 dark:border-amber-800/50'
                                }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${user?.role === "ADMIN" ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                                <h2 className='text-[11px] font-black uppercase tracking-wider'>{user?.role}</h2>
                            </div>

                            <div className={`inline-flex items-center px-4 py-1.5 rounded-xl gap-x-2 border shadow-sm
                                ${user?.status === "ACTIVE"
                                    ? 'text-emerald-600 bg-emerald-100 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50'
                                    : 'text-red-600 bg-red-100 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50'
                                }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${user?.status === "ACTIVE" ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                <h2 className='text-[11px] font-black uppercase tracking-wider'>{user?.status}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Card */}
                <div className="lg:col-span-1 bg-white dark:bg-[#161617] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Overview</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between group cursor-default">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 group-hover:scale-110 transition-transform"><Star size={18} /></div>
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Reliability</span>
                            </div>
                            <span className="text-sm font-black text-gray-900 dark:text-white">99%</span>
                        </div>
                        <div className="flex items-center justify-between group cursor-default">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 group-hover:scale-110 transition-transform"><CheckCircle2 size={18} /></div>
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Verified</span>
                            </div>
                            <span className="text-sm font-black text-indigo-600">{user?.emailVerified ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <div className="lg:col-span-2 bg-white dark:bg-[#161617] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Detailed Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6">
                        <DetailItem icon={<Mail size={16} />} label="Primary Email" value={user?.email} />
                        <DetailItem icon={<Calendar size={16} />} label="Join Date" value={joinDate} />
                        <DetailItem icon={<ShieldCheck size={16} />} label="Security" value={user?.needPasswordChange ? "Action Needed" : "Secure"} />
                        <DetailItem icon={<UserIcon size={16} />} label="Unique ID" value={`#${user?.id?.slice(-10)}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className="p-2.5 bg-gray-50 dark:bg-gray-800/50 text-indigo-500 rounded-xl border border-gray-100 dark:border-gray-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 break-all">{value}</p>
            </div>
        </div>
    );
}