/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Modal from '@/components/ui/modal';
import { Upload, X, User as UserIcon, Camera, MapPin, Globe, Save } from "lucide-react";
import Image from 'next/image';
import { IGetProfile, IUpdateProfile } from '@/interface/updateProfile.interface';
import { UpdateProfileAction } from './UpdateProfileAction';
import { uploadToCloudinary } from '../uploadToCloudinary/uploadToCloudinary';

export default function UpdateUserProfile({ isOpen, onClose, userData }: { isOpen: boolean; onClose: () => void; userData: IGetProfile }) {
    const id = userData.id;
    const [uploading, setUploading] = useState(false);

    // ইমেজ প্রিভিউ এবং আসল ফাইল অবজেক্টের স্টেট
    const [coverPreview, setCoverPreview] = useState<string | null>(userData?.coverPhoto || null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(userData?.image || null);

    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const coverInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    // userData থেকে এক্সিস্টিং ডাটা ডিসট্রাকচারিং (যদি ইন্টারফেসে fullName থাকে, তবে সেভাবে সেট করুন)
    const { username, countryName, locationState, shortBio } = userData;
    // আপনার ইন্টারফেস অনুযায়ী name বা fullName ব্যাকআপ হ্যান্ডলিнг
    const defaultName = (userData as any).fullName || (userData as any).name || "";

    // Base64 স্ট্রিংকে File অবজেক্টে রূপান্তর করার হেল্পার ফাংশন
    const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };


    // ইমেজ সিলেক্ট ও ক্লায়েন্ট সাইড ক্যানভাস কম্প্রেশন হ্যান্ডলার
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
                    const convertedFile = dataURLtoFile(compressedBase64, file.name);

                    if (type === 'cover') {
                        setCoverPreview(compressedBase64);
                        setCoverFile(convertedFile);
                    } else {
                        setAvatarPreview(compressedBase64);
                        setAvatarFile(convertedFile);
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const removeCoverImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCoverPreview(null);
        setCoverFile(null);
        if (coverInputRef.current) coverInputRef.current.value = "";
    };

    const removeAvatarImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAvatarPreview(null);
        setAvatarFile(null);
        if (avatarInputRef.current) avatarInputRef.current.value = "";
    };

    // ফরম সাবমিট হ্যান্ডলার
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget);
        const fullNameInput = formData.get("name") as string;
        const usernameVal = formData.get("username") as string;
        const country = formData.get("Country") as string;
        const location = formData.get("location") as string;
        const bio = formData.get("bio") as string;

        try {
            let finalAvatarUrl = userData?.image || "";
            let finalCoverUrl = userData?.coverPhoto || "";

            // নতুন অবতার থাকলে ক্লাউডিনারিতে আপলোড হবে
            if (avatarFile) {
                finalAvatarUrl = await uploadToCloudinary(avatarFile);
            } else if (avatarPreview === null) {
                finalAvatarUrl = "";
            }

            // নতুন কাভার ফটো থাকলে ক্লাউডিনারিতে আপলোড হবে
            if (coverFile) {
                finalCoverUrl = await uploadToCloudinary(coverFile);
            } else if (coverPreview === null) {
                finalCoverUrl = "";
            }

            // আপনার আইডেন্টিফাইড ইন্টারফেস (IUpdateProfile) অনুযায়ী অবজেক্ট তৈরি
            const payload: IUpdateProfile = {
                name: fullNameInput,
                username: usernameVal,
                countryName: country,
                locationState: location,
                shortBio: bio,
                image: finalAvatarUrl,
                coverPhoto: finalCoverUrl,
            };

            // সঠিক অর্ডার: প্রথমে string id, তারপর payload অবজেক্ট
            const response = await UpdateProfileAction(id, payload);

            if (response?.success) {
                toast.success(response.message || "Profile updated successfully!");
                onClose();
            } else {
                toast.error(response?.message || "Failed to update profile.");
            }
        } catch (error) {
            toast.error("Something went wrong during image upload or profile update.");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="lg">
            <form onSubmit={handleSubmit} className="space-y-6 py-2 bg-white dark:bg-gray-900 text-foreground transition-colors duration-200">

                {/* Cover Photo Area */}
                <div className="relative mb-20">
                    <div
                        onClick={() => coverInputRef.current?.click()}
                        className="group relative w-full h-40 md:h-48 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 overflow-hidden bg-slate-50 dark:bg-zinc-900/60 flex flex-col items-center justify-center transition-all cursor-pointer"
                    >
                        {coverPreview ? (
                            <>
                                <Image fill src={coverPreview} alt="Cover Preview" className="object-cover" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                    <div className="bg-white/20 backdrop-blur-xs text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold border border-white/20">
                                        <Camera size={14} /> Change Cover Photo
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeCoverImage}
                                    className="absolute cursor-pointer top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-md transition-all z-30 shadow-lg"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-indigo-500 transition-colors pointer-events-none">
                                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                                    <Upload size={20} />
                                </div>
                                <span className="text-xs font-semibold">Upload Cover Photo</span>
                            </div>
                        )}
                        <input ref={coverInputRef} type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'cover')} className="hidden" />
                    </div>

                    {/* Avatar Photo Area */}
                    <div className="absolute -bottom-16 left-6 md:left-10 z-20">
                        <div className="relative group">
                            <div
                                onClick={() => avatarInputRef.current?.click()}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-[6px] border-white dark:border-gray-900 bg-slate-100 dark:bg-zinc-900 shadow-xl overflow-hidden flex items-center justify-center ring-1 ring-black/5 cursor-pointer relative"
                            >
                                {avatarPreview ? (
                                    <>
                                        <Image src={avatarPreview} fill alt="Avatar Preview" className="object-cover rounded-full" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 rounded-full">
                                            <Camera size={20} className="text-white" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeAvatarImage}
                                            className="absolute cursor-pointer top-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full backdrop-blur-md transition-all z-30 shadow-lg"
                                        >
                                            <X size={12} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-slate-400 dark:text-zinc-600"><UserIcon size={48} /></div>
                                )}
                            </div>
                            <input type="file" ref={avatarInputRef} onChange={(e) => handleImageChange(e, 'avatar')} className="hidden" accept="image/*" />
                        </div>
                    </div>
                </div>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Full Name</label>
                        <div className="relative group">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <input name="name" defaultValue={defaultName} type="text" required placeholder="John Doe" className="w-full h-12 pl-11 pr-4 bg-slate-50/50 dark:bg-zinc-800/20 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Username</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-indigo-500">@</span>
                            <input name="username" defaultValue={username} type="text" required placeholder="johndoe" className="w-full h-12 pl-9 pr-4 bg-slate-50/50 dark:bg-zinc-800/20 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Country Name</label>
                        <div className="relative group">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <input name="Country" defaultValue={countryName} type="text" placeholder="Country name" className="w-full h-12 pl-11 pr-4 bg-slate-50/50 dark:bg-zinc-800/20 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Location / State</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <input name="location" defaultValue={locationState} type="text" placeholder="Dhaka, Bangladesh" className="w-full h-12 pl-11 pr-4 bg-slate-50/50 dark:bg-zinc-800/20 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium" />
                        </div>
                    </div>
                </div>

                {/* Short Bio */}
                <div className="space-y-1.5">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-wider ml-1">Short Bio</label>
                    <textarea name="bio" defaultValue={shortBio} rows={3} maxLength={160} placeholder="Tell the world about yourself..." className="w-full p-4 bg-slate-50/50 dark:bg-zinc-800/20 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium resize-none" />
                </div>

                {/* Submit Button */}
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