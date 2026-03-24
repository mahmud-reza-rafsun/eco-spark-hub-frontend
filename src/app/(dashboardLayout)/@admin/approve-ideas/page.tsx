/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import { ApproveStatus } from "@/constants/ApproveStatus";
import ApproveIdeaRow from "../../_components/AdminComponents/IdeaApprove/ApproveIdeaRow";

export default async function ApproveIdeaPage() {
    const response = await adminService.getPendingIdeas();

    // API returns data as an array directly based on your JSON
    const allIdeas = Array.isArray(response?.data) ? response.data : [];

    // Filtering for PENDING status
    const displayIdeas = allIdeas.filter((idea: any) =>
        idea.status?.toUpperCase() !== ApproveStatus.APPROVED
    );

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Submissions</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage pending and rejected project ideas.</p>
                </div>
                <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                    <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                        {displayIdeas.length} Items
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-[11px] uppercase text-gray-500 dark:text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Idea Title</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Current Status</th>
                            <th className="px-6 py-4">Admin Feedback (If rejecting)</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {displayIdeas.map((idea: any) => (
                            <ApproveIdeaRow key={idea.id} idea={idea} />
                        ))}
                    </tbody>
                </table>

                {displayIdeas.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">All caught up! No pending ideas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}