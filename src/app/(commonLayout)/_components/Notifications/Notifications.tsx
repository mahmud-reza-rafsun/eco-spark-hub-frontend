/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Modal from '@/components/ui/modal';
import { Bell, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';

export default function Notifications({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {


    const notifications = [
        {
            id: "1",
            message: "আপনার 'Smart City' আইডিয়াটি অ্যাপ্রুভ করা হয়েছে!",
            type: "APPROVED",
            isRead: false,
            createdAt: "2 mins ago",
            user: {
                image: "https://i.pravatar.cc/150?u=admin",
                name: "Admin"
            }
        },
        {
            id: "2",
            message: "দুঃখিত, আপনার 'E-Waste' আইডিয়াটি রিজেক্ট করা হয়েছে।",
            type: "REJECTED",
            isRead: true,
            createdAt: "1 hour ago",
            user: {
                image: "https://i.pravatar.cc/150?u=system",
                name: "System"
            }
        }
    ];

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const res = await getAllCategoriesAction();
    //             if (res.success) setCategories(res.data);
    //         } catch (error) {
    //             console.error("Error loading categories", error);
    //         } finally {
    //             setLoadingCategories(false);
    //         }
    //     };
    //     if (isOpen) {
    //         fetchCategories();
    //     }
    // }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Notifications"
            size="lg"
        >
            <div className=" bg-white dark:bg-slate-900 shadow-lg rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                        <Bell className="w-5 h-5 text-orange-500" /> Notifications
                    </h2>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                        {notifications.filter(n => !n.isRead).length} New
                    </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 flex gap-4 transition-colors cursor-pointer ${notification.isRead ? 'bg-transparent' : 'bg-orange-50/30 dark:bg-orange-900/10'}`}
                        >
                            <div className="relative">
                                <Image
                                    height={48}
                                    width={48}
                                    src={notification.user.image}
                                    alt="user"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5">
                                    {notification.type === 'APPROVED' ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-red-500" />
                                    )}
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className={`text-sm ${notification.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100 font-medium'}`}>
                                    {notification.message}
                                </p>
                                <span className="text-xs text-slate-400 mt-1 block">
                                    {notification.createdAt}
                                </span>
                            </div>

                            {/* আনরিড ডট */}
                            {!notification.isRead && (
                                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mt-2 self-start"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-3 text-center border-t border-slate-100 dark:border-slate-800">
                    <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                        View All Notifications
                    </button>
                </div>
            </div>
        </Modal>
    );
}