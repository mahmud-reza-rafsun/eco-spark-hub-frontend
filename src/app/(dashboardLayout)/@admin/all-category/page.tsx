/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import AllCategory from "../../_components/AdminComponents/AllCategory/AllCategory";

export default async function CategoryPage() {
    const response = await adminService.getAllCategory();

    const categories = response?.data || [];

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Category Activity</h2>
                    <p className="text-sm text-gray-500">Monitor all category names and slugs</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-semibold">Total Category</p>

                </div>
                <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                    <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                        {categories.length} Category
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-xs uppercase text-gray-600 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Category Name</th>
                            <th className="px-6 py-4">Slug</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {categories.length > 0 ? (
                            categories.map((category: any) => (
                                <AllCategory key={category.id || category.id} category={category} />
                            ))
                        ) : (
                            <div className="text-center py-16 border-t border-gray-100 dark:border-gray-800">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">All caught up! pending ideas not found.</p>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}