"use client";
import { UserStatus } from "@/constants/UserStatus";
import { Trash2, UserMinus, UserCheck } from "lucide-react";
import { useState } from "react";
import { deleteUserAction, toggleBlockUserAction } from "../UserTableAdminAction/UserTableAdminAction";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTableRow({ user }: { user: any; }) {
    const { createdAt, email, id, name, role, status } = user;
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleBlock = async () => {
        setIsLoading(true);
        await toggleBlockUserAction(id)
        setIsLoading(false);
    };

    const deleteUser = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteUserAction(id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                        <p className="text-xs text-gray-500">{email}</p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
            ${role?.toUpperCase() === "MEMBER" ? 'text-blue-500 bg-blue-100/60 dark:bg-blue-900/30 dark:text-blue-400' : ''} 
            ${role?.toUpperCase() === "ADMIN" ? 'text-green-500 bg-green-100/60 dark:bg-green-900/30 dark:text-green-400' : ''}`}
                >
                    <span
                        className={`h-1.5 w-1.5 rounded-full 
                ${role?.toUpperCase() === "MEMBER" ? 'bg-blue-500 dark:bg-blue-400' : ''} 
                ${role?.toUpperCase() === "ADMIN" ? 'bg-green-500 dark:bg-green-400' : ''}`}
                    ></span>
                    <h2 className='text-xs font-normal'>{role}</h2>
                </div>
            </td>

            {/* User Status Column */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2
            ${status === UserStatus.ACTIVE ? 'text-green-500 bg-green-100/60 dark:bg-green-900/30 dark:text-green-400' : ''} 
            ${(status === UserStatus.BLOCKED || status === UserStatus.DELETED) ? 'text-red-500 bg-red-100/60 dark:bg-red-900/30 dark:text-red-400' : ''}`}>
                    <span className={`h-1.5 w-1.5 rounded-full
                        ${status === UserStatus.ACTIVE ? 'bg-green-500 dark:bg-green-400' : ''} 
                        ${(status === UserStatus.DELETED || status === UserStatus.BLOCKED) ? 'bg-red-500 dark:bg-red-400' : ''}`}>
                    </span><h2 className='text-xs font-normal'>{status}</h2>
                </div>
            </td>

            <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
            </td>

            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                    {/* Block/Unblock Button */}
                    <button
                        onClick={handleToggleBlock}
                        disabled={isLoading || role === 'ADMIN' || status === UserStatus.DELETED}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${status === UserStatus.BLOCKED
                            ? 'text-green-600 hover:bg-green-50 dark:hover:bg-gray-800/70'
                            : 'text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800/70'
                            } disabled:opacity-30 disabled:cursor-not-allowed`}
                        title={status === UserStatus.BLOCKED ? "Unblock User" : "Block User"}
                    >
                        {status === UserStatus.BLOCKED ? <UserCheck size={18} /> : <UserMinus size={18} />}
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={() => deleteUser(id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800/70 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={isLoading || role === 'ADMIN' || status === UserStatus.DELETED}
                        title="Delete User">
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}