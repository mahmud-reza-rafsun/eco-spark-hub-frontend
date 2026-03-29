/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import { CheckCircle } from "lucide-react";
import ManageIdeaRow from "../../_components/AdminComponents/ManageIdea/ManageIdeaRow";

export default async function ManageIdeasPage() {
    const response = await adminService.getPendingIdeas();
    const displayIdeas = response?.data || [];

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Idea Submissions</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Project Ideas Update and Delete</p>
                </div>
                <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                    <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                        {displayIdeas.length} Ideas
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-[11px] uppercase text-gray-500 dark:text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Idea Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {displayIdeas.map((idea: any) => (
                            <ManageIdeaRow key={idea.id || idea._id} idea={idea} />
                        ))}
                    </tbody>
                </table>

                {displayIdeas.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 mb-4">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No Data Found!</p>
                    </div>
                )}
            </div>
        </div>
    );
}