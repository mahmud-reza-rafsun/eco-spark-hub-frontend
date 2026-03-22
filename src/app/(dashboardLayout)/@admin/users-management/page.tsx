/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import UserTableRow from "../../_components/UserTableRow/UserTableRow";

export const dynamic = 'force-dynamic';

export default async function page() {
    const { data } = await adminService.getAllUsers();

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold">User Management</h2>
                <p className="text-sm text-gray-500">Manage all users, block or delete their accounts.</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined At</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {data?.map((user: any) => (
                            <UserTableRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>

                {(!data || data.length === 0) && (
                    <div className="text-center py-10 text-gray-500">No users found.</div>
                )}
            </div>
        </div>
    );
}