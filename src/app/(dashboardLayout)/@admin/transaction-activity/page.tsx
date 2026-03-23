import { adminService } from "@/service/admin.service";
import TransactionRow from "../../_components/TransactionActivaty/TransactionRow/TransactionRow";
import { IPayment } from "@/interface/transaction.interface";

export default async function TransactionPage() {
    // API থেকে ডেটা ফেচ করা
    const response = await adminService.transactionActivity();

    // আপনার ডেটা স্ট্রাকচার অনুযায়ী: response.data.purchases
    const purchases: IPayment[] = response?.data?.purchases || [];
    const totalRevenue = response?.data?.totalRevenue || 0;

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            {/* Header with Revenue Summary */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transaction Activity</h2>
                    <p className="text-sm text-gray-500">Monitor all payments and idea purchases.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-semibold">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-500">${totalRevenue}</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-xs uppercase text-gray-600 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Buyer Info</th>
                            <th className="px-6 py-4">Idea</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {purchases.length > 0 ? (
                            purchases.map((trans: IPayment) => (
                                <TransactionRow key={trans.id} trans={trans} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500 dark:text-gray-400">
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}