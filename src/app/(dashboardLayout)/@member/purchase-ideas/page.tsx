/* eslint-disable @typescript-eslint/no-explicit-any */
import { memberService } from "@/service/member.service";
import PurchaseIdeaRow from "../../_components/MemberComponents/PurchasesIdea/PurchaseIdeaRow";

export default async function page() {
    const response = await memberService.getMyPurchaseIdeas();

    // Extracting data based on your JSON structure
    const purchases = Array.isArray(response?.data?.purchases) ? response.data.purchases : [];
    const totalSpent = response?.data?.totalSpent || 0;

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Purchase History</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View and manage all your purchased project ideas and invoices.</p>
                </div>

                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">Total Spent</p>
                        <p className="text-lg font-semibold text-indigo-500 dark:text-indigo-400">${totalSpent}</p>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Total Orders</p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{purchases.length}</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-[11px] uppercase text-gray-500 dark:text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Project Title</th>
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {purchases.map((purchase: any) => (
                            <PurchaseIdeaRow key={purchase.id} purchase={purchase} />
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {purchases.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">You have not purchased any ideas yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}