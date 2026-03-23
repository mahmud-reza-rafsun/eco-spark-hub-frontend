"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { categoryPostAction } from "./categoryPostAction";
import { toast } from "sonner";

export default function CategoryPostForm() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log("Form Submit Triggered");

            const formData = new FormData(e.currentTarget);

            const name = formData.get("name");
            const slug = formData.get("slug");
            console.log("Form Data:", { name, slug });

            if (!name || !slug) {
                toast.error("Please fill up all fields!");
                return;
            }
            const result = await categoryPostAction(formData);

            console.log("Server Response:", result);

            if (result?.success) {
                toast.success("Category added successfully!");
                // e.currentTarget.reset();
            } else {
                toast.error(result?.error || "Failed to add category");
            }

        } catch (error) {
            console.error("❌ Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <tr className="bg-white dark:bg-[#161617] group hover:bg-gray-50/50 dark:hover:bg-[#1c1c1d]/50 transition-colors">
            <td colSpan={3} className="p-0">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row items-center w-full divide-x-0 md:divide-x divide-gray-100 dark:divide-gray-800">
                    {/* Name Input */}
                    <div className="flex-2 w-full px-6 py-4">
                        <input
                            name="name"
                            type="text"
                            placeholder="Category Name..."
                            required
                            className="w-full bg-transparent text-sm text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-indigo-500/30 rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Slug Input */}
                    <div className="flex-2 w-full px-6 py-4">
                        <input
                            name="slug"
                            type="text"
                            placeholder="category-slug"
                            required
                            className="w-full bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none focus:ring-1 focus:ring-indigo-500/30 rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Button */}
                    <div className="flex-1 px-6 py-4 text-right">
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white h-9 px-6 rounded-lg transition-all active:scale-95 flex items-center gap-2 ml-auto">
                            <PlusCircle size={16} />
                            <span>Add Category</span>
                        </Button>
                    </div>
                </form>
            </td>
        </tr>
    );
}
