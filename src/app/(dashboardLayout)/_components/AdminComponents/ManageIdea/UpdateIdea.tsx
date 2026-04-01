/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Modal from '@/components/ui/modal';
import { Upload, X, Lightbulb, DollarSign } from "lucide-react";
import Image from 'next/image';
import { updateIdeaAction } from './ManageIdeaAction';
import { getAllCategoriesAction } from '@/app/(commonLayout)/_components/PostIdea/createPost/IdeaFormAction';

export default function UpdateIdea({
    isOpen,
    onClose,
    idea
}: {
    isOpen: boolean;
    onClose: () => void;
    idea: any;
}) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
    // const [loadingCategories, setLoadingCategories] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isOpen && idea?.images) {
            setPreview(idea.images);
        }
    }, [isOpen, idea]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
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
            id: idea?.id,
            categoryId: formData.get("categoryId"),
            price: Number(formData.get("price")) || 0,
            problem: formData.get("problem"),
            solution: formData.get("solution"),
            description: formData.get("description"),
            title: (formData.get("problem") as string)?.slice(0, 50),
            images: preview || "",
        };

        try {
            const res = await updateIdeaAction(payload, idea.id);
            if (res?.success) {
                toast.success("Idea updated successfully!");
                onClose();
            } else {
                toast.error(res?.error || "Failed to update idea");
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
            }
        };
        if (isOpen) fetchCategories();
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Idea" size="lg">
            <form onSubmit={handleIdeaSubmit} className="space-y-5 py-2">
                {/* Image Section */}
                <div className="">
                    <label className="text-[13px] font-semibold text-foreground/70 ml-1">Cover Image</label>
                    <div onClick={() => !preview && fileInputRef.current?.click()}
                        className={`relative group border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                            ${preview ? "border-none h-48" : "border-muted-foreground/20 hover:border-indigo-500/50 hover:bg-indigo-50/10 h-32 cursor-pointer"}`}>
                        {preview ? (
                            <>
                                <Image height={200} width={200} src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                                <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-md transition-all">
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Upload size={20} className="text-indigo-500" />
                                <p className="text-xs font-medium text-muted-foreground">Click to upload cover image</p>
                            </div>
                        )}
                        <input ref={fileInputRef} name="images" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="">
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">Category</label>
                        <select
                            name="categoryId"
                            defaultValue={idea?.categoryId}
                            className="w-full h-12 px-4 bg-muted/30 border border-muted-foreground/10 rounded-xl outline-none text-sm appearance-none">
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className="">
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">Price</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                name="price"
                                type="number"
                                defaultValue={idea?.price}
                                className="w-full h-12 pl-11 pr-4 bg-muted/30 border border-muted-foreground/10 rounded-xl outline-none text-sm" />
                        </div>
                    </div>
                </div>

                {/* Problem, Solution & Description */}
                <div className="space-y-4">
                    <div>
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">The Problem</label>
                        <textarea name="problem" defaultValue={idea?.problem} required rows={2} className="w-full p-4 bg-muted/30 border border-muted-foreground/10 rounded-xl outline-none text-sm resize-none" />
                    </div>
                    <div>
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">The Solution</label>
                        <textarea name="solution" defaultValue={idea?.solution} required rows={2} className="w-full p-4 bg-muted/30 border border-muted-foreground/10 rounded-xl outline-none text-sm resize-none" />
                    </div>
                    <div>
                        <label className="text-[13px] font-semibold text-foreground/70 ml-1">Full Description</label>
                        <textarea name="description" defaultValue={idea?.description} required rows={4} className="w-full p-4 bg-muted/30 border border-muted-foreground/10 rounded-xl outline-none text-sm resize-none" />
                    </div>
                </div>

                <Button type="submit" disabled={uploading} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">
                    {uploading ? "Updating..." : "Update Idea"}
                    <Lightbulb className="ml-2 h-4 w-4" />
                </Button>
            </form>
        </Modal>
    );
}