/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Modal from '@/components/ui/modal';
import { Upload, X, User as UserIcon, Camera, MapPin, Globe, UserCheck, Save } from "lucide-react";
import Image from 'next/image';

export default function UpdateUserProfile({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
    const [uploading, setUploading] = useState(false);

    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const coverInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'avatar') => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size is too large! Please upload under 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new (window as any).Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = type === 'cover' ? 1200 : 400;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;

                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);

                    if (type === 'cover') {
                        setCoverPreview(compressedBase64);
                    } else {
                        setAvatarPreview(compressedBase64);
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const removeCoverImage = () => {
        setCoverPreview(null);
        if (coverInputRef.current) coverInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        // এখানে আপনার ব্যাকএন্ড সাবমিট লজিক কাজ করবে
        setTimeout(() => {
            setUploading(false);
            toast.success("Profile updated successfully!");
            onClose();
        }, 1500);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Profile Visuals & Info"
            size="lg">

            <form onSubmit={handleSubmit} className="space-y-6 py-2 bg-white dark:bg-zinc-950 text-foreground transition-colors duration-200">

                {/* Visual Header Identity Layer (Facebook Layout) */}
                <div className="relative mb-20">
                    {/* 1. Cover Photo Area */}
                    <div className="group relative w-full h-40 md:h-48 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 overflow-hidden bg-slate-50 dark:bg-zinc-900/60 flex flex-col items-center justify-center transition-all">
                        {coverPreview ? (
                            <>
                                <Image fill src={coverPreview} alt="Cover Preview" className="object-cover" />
                                <button
                                    type="button"
                                    onClick={removeCoverImage}
                                    className="absolute cursor-pointer top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-md transition-all z-10 shadow-lg">
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => coverInputRef.current?.click()}
                                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-indigo-500 transition-colors cursor-pointer w-full h-full justify-center">
                                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                                    <Upload size={20} />
                                </div>
                                <span className="text-xs font-semibold">Upload Cover Photo</span>
                            </button>
                        )}
                        <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'cover')}
                            className="hidden"
                        />
                    </div>

                    {/* 2. Avatar Photo Area (Perfect Overlapping) */}
                    <div className="absolute -bottom-16 left-6 md:left-10 z-20">
                        <div className="relative group">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-[6px] border-white dark:border-zinc-950 bg-slate-100 dark:bg-zinc-900 shadow-xl overflow-hidden flex items-center justify-center ring-1 ring-black/5">
                                {avatarPreview ? (
                                    <Image src={avatarPreview} fill alt="Avatar Preview" className="object-cover rounded-full" />
                                ) : (
                                    <div className="text-slate-400 dark:text-zinc-600"><UserIcon size={48} /></div>
                                )}
                            </div>

                            {/* Camera Trigger Button */}
                            <button
                                type="button"
                                onClick={() => avatarInputRef.current?.click()}
                                className="absolute cursor-pointer bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-xl transition-all border-4 border-white dark:border-zinc-950 active:scale-90"
                            >
                                <Camera size={16} />
                            </button>
                            <input
                                type="file"
                                ref={avatarInputRef}
                                onChange={(e) => handleImageChange(e, 'avatar')}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>

                {/* Info Fields Grid Layer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Full Name</label>
                        <div className="relative group">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="John Doe"
                                className="w-full h-12 pl-11 pr-4 bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Username Handler */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Username</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-indigo-500">@</span>
                            <input
                                name="username"
                                type="text"
                                required
                                placeholder="johndoe"
                                className="w-full h-12 pl-9 pr-4 bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Website / Portfolio Link */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Country Name</label>
                        <div className="relative group">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="Country"
                                type="text"
                                placeholder="Country name"
                                className="w-full h-12 pl-11 pr-4 bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Location Info */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Location / State</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="location"
                                type="text"
                                placeholder="Dhaka, Bangladesh"
                                className="w-full h-12 pl-11 pr-4 bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>


                </div>

                {/* Short Bio Bio Box */}
                <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Short Bio</label>
                    <textarea
                        name="bio"
                        rows={3}
                        maxLength={160}
                        placeholder="Tell the world about yourself..."
                        className="w-full p-4 bg-slate-50/50 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium resize-none"
                    />
                </div>

                {/* Action Submit Area */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={uploading}
                        className="w-full h-12 cursor-pointer bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        {uploading ? "Saving Changes..." : "Update Profile Details"}
                        <Save size={16} />
                    </Button>
                </div>
            </form>
        </Modal>
    );
}