"use client"
import React, { useState, useRef } from 'react';
import { Camera, Send, Info, Loader2, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { toast } from 'sonner';
import { insightPostAction } from '../InsightCategoryPostFrom/InsightsPostAction';

interface FormData {
    title: string;
    category: string;
    description: string;
}

const IMGBB_API_KEY = "57014837a17f5c2ef8d80b84b2f2fbbd";

const initialFormData: FormData = {
    title: '',
    category: '',
    description: '',
};

export default function InsightCard() {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<FormData>(initialFormData);

    // Ref to reset the file input element after publish or clear
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Revoke previous object URL to avoid memory leaks
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const clearImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        setSelectedFile(null);

        // Reset the native file input so the same file can be re-selected
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        clearImage();
    };

    const handlePublish = async () => {
        if (!formData.title || !formData.category || !formData.description || !selectedFile) {
            toast.error("Please fill in all fields and upload an image.");
            return;
        }

        setLoading(true);

        try {
            // 1. Upload image to ImgBB
            const imgFormData = new FormData();
            imgFormData.append('image', selectedFile);

            const imgResponse = await fetch(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                { method: 'POST', body: imgFormData }
            );

            if (!imgResponse.ok) {
                throw new Error(`Image upload request failed (${imgResponse.status})`);
            }

            const imgData = await imgResponse.json();

            if (!imgData.success) {
                throw new Error("Image upload failed");
            }

            const imageUrl: string = imgData.data.url;

            // 2. Prepare payload
            const payload = {
                title: formData.title,
                category: formData.category,
                description: formData.description,
                image: imageUrl,
            };

            console.log("payload in client page", payload);

            // 3. Call server action
            const response = await insightPostAction(payload);

            if (response.success) {
                toast.success("Insight published successfully!");
                resetForm();
            } else {
                toast.error(response.error || "Failed to save insight.");
            }
        } catch (error: unknown) {
            console.error("Publish Error:", error);
            const message = error instanceof Error ? error.message : "Something went wrong.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#0c0c0e] border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl shadow-indigo-500/5">
            {/* Header */}
            <div className="bg-indigo-500 p-6 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                    <Info className="text-white" size={20} />
                </div>
                <div>
                    <h2 className="text-white font-bold text-xl">Share New Insight</h2>
                    <p className="text-indigo-100 text-xs">Spread sustainable ideas to the EcoSpark Hub</p>
                </div>
            </div>

            <div className="p-8 space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold ml-1">Insight Title</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Solar Energy Title"
                        className="rounded-xl border-gray-200 dark:border-gray-800 focus:ring-indigo-500 dark:bg-black"
                    />
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold ml-1">Insight Category</Label>
                    <Input
                        id="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g. Solar Energy Category"
                        className="rounded-xl border-gray-200 dark:border-gray-800 focus:ring-indigo-500 dark:bg-black"
                    />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <Label className="text-sm font-semibold ml-1">Featured Image</Label>
                    <div
                        className={`relative h-48 w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${imagePreview
                            ? 'border-indigo-500'
                            : 'border-gray-200 dark:border-gray-800 hover:border-indigo-500 bg-gray-50 dark:bg-black'
                            }`}
                    >
                        {imagePreview ? (
                            <>
                                <Image
                                    src={imagePreview}
                                    height={400}
                                    width={400}
                                    className="w-full h-full object-cover rounded-2xl"
                                    alt="Preview"
                                />
                                <button
                                    onClick={clearImage}
                                    className="absolute cursor-pointer top-2 right-2 p-0.5 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform"
                                    aria-label="Remove image"
                                >
                                    <X />
                                </button>
                            </>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center group w-full h-full justify-center">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-full group-hover:scale-110 transition-transform">
                                    <Camera className="text-indigo-500" size={24} />
                                </div>
                                <span className="mt-2 text-sm text-gray-500">Click to upload cover image</span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold ml-1">Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Explain your sustainable idea..."
                        className="rounded-xl min-h-[120px] border-gray-200 dark:border-gray-800 focus:ring-indigo-500 dark:bg-black"
                    />
                </div>

                {/* Publish Button */}
                <Button
                    disabled={loading}
                    onClick={handlePublish}
                    className="w-full h-12 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
                >
                    {loading ? (
                        <><Loader2 className="animate-spin" size={18} /> Processing...</>
                    ) : (
                        <><Send size={18} /> Publish Insight</>
                    )}
                </Button>
            </div>
        </div>
    );
}