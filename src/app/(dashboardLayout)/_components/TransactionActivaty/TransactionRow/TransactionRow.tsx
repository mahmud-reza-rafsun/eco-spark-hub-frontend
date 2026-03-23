"use client";
import { PaymentStatus } from "@/constants/PaymentStatus";
import { IPayment } from "@/interface/transaction.interface";
import Image from "next/image";

export default function TransactionRow({ trans }: { trans: IPayment }) {
    const { amount, transactionId, status, createdAt, user, idea } = trans;

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors">
            {/* User Info */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 font-bold uppercase">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
            </td>

            {/* Idea Title */}
            <td className="px-6 py-4">
                {/* <Image
                    src={idea?.image ? "" : ""}
                    alt={idea.title}
                    fill
                    className="rounded-full object-cover"
                /> */}
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-200px" title={idea.title}>
                    {idea.title}
                </p>
            </td>

            {/* Amount */}
            <td className="px-6 py-4">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                    ${amount}
                </p>
            </td>

            {/* Transaction ID */}
            <td className="px-6 py-4 text-xs font-mono text-gray-500 uppercase">
                {transactionId}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                    ${status === PaymentStatus.PAID ? 'text-green-500 bg-green-100/60 dark:bg-green-900/30 dark:text-green-400' :
                        status === PaymentStatus.UNPAID ? 'text-yellow-500 bg-yellow-100/60 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'text-red-500 bg-red-100/60 dark:bg-red-900/30 dark:text-red-400'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full 
                        ${status === PaymentStatus.PAID ? 'bg-green-500' : PaymentStatus.UNPAID ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    </span>
                    <h2 className='text-xs font-medium uppercase'>{status}</h2>
                </div>
            </td>

            {/* Date */}
            <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(createdAt).toLocaleDateString()}
            </td>
        </tr>
    );
}