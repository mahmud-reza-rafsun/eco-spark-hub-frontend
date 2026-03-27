/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Modal from '@/components/ui/modal';
import { Upload, X, Lightbulb, DollarSign } from "lucide-react";
import Image from 'next/image';
import { getAllCategoriesAction, IdeaFormAction } from './IdeaFormAction';

export default function IdeaPostForm({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;

                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);
                    setPreview(compressedBase64);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleIdeaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget);

        const payload = {
            categoryId: formData.get("categoryId"),
            price: Number(formData.get("price")) || 0,
            problem: formData.get("problem"),
            solution: formData.get("solution"),
            description: formData.get("description"),
            title: (formData.get("problem") as string)?.slice(0, 50),
            images: preview || "",
        };

        try {
            const res = await IdeaFormAction(payload);

            if (res?.success) {
                toast.success("Idea shared successfully!");
                onClose();
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            } else {
                toast.error(res?.error || "Failed to post idea");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategoriesAction();
                if (res.success) setCategories(res.data);
            } catch (error) {
                console.error("Error loading categories", error);
            } finally {
                setLoadingCategories(false);
            }
        };
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Post a New Idea"
            size="lg">
            <form onSubmit={handleIdeaSubmit} className="space-y-5 py-2">
                {/* Image Upload Area - Modern Card Style */}
                <div className="">
                    <label className="text-[13px] font-semibold text-foreground/70 ml-1">Cover Image</label>
                    <div onClick={() => !preview && fileInputRef.current?.click()}
                        className={`relative group border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                            ${preview ? "border-none h-48" : "border-muted-foreground/20 hover:border-indigo-500/50 hover:bg-indigo-50/10 h-32 cursor-pointer"}`}>
                        {preview ? (
                            <>
                                <Image height={200} width={200} src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-md transition-all">
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-500 group-hover:scale-110 transition-transform">
                                    <Upload size={20} />
                                </div>
                                <p className="text-xs font-medium text-muted-foreground">Click to upload cover image</p>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            name="images"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Selection */}
                    <div className="">
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">Category</label>
                        <div className="relative group">
                            <select
                                name="categoryId"
                                required
                                className="w-full h-12 px-4 bg-muted/30 border border-muted-foreground/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm appearance-none cursor-pointer">
                                {!loadingCategories && categories.map((category) => (
                                    <option key={category.id} value={category.id} className="bg-background">
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Price Input */}
                    <div className="">
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">Price (Optional)</label>
                        <div className="relative group">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full h-12 pl-11 pr-4 bg-muted/30 border border-muted-foreground/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm" />
                        </div>
                    </div>
                </div>

                {/* Problem & Solution - Subtle Textareas */}
                <div className="">
                    <div className="space-y-2">
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">The Problem</label>
                        <textarea
                            name="problem"
                            required
                            rows={2}
                            placeholder="What pain point are you addressing?"
                            className="w-full p-4 bg-muted/30 border border-muted-foreground/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none" />
                    </div>

                    <div className="">
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">The Solution</label>
                        <textarea
                            name="solution"
                            required
                            rows={2}
                            placeholder="How does your idea solve this?"
                            className="w-full p-4 bg-muted/30 border border-muted-foreground/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none" />
                    </div>
                </div>

                {/* Description */}
                <div className="">
                    <label className="text-[13px] font-semibold text-foreground/70 ml-1">Full Description</label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        placeholder="Go into detail about your vision..."
                        className="w-full p-4 bg-muted/30 border border-muted-foreground/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none" />
                </div>

                {/* Submit Action */}
                <div className="">
                    <Button
                        type="submit"
                        disabled={uploading}
                        className="w-full h-12 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]">
                        {uploading ? "Uploading..." : "Publish Idea"}
                        <Lightbulb className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Modal>
    );
}