/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
    CheckCircle, Clock, XCircle, ShoppingBag,
    MessageSquare, ThumbsUp, ThumbsDown, LayoutDashboard,
    ArrowUpRight
} from 'lucide-react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis,
    Tooltip, ResponsiveContainer, LabelList, Cell, CartesianGrid
} from 'recharts';

interface StatCardProps {
    title: string;
    value: number;
    icon: any;
    color: string;
    prefix?: string;
}

const StatCard = ({ title, value, icon: Icon, color, prefix = "" }: StatCardProps) => (
    <div className="group relative bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(99,102,241,0.12)] hover:border-indigo-500/40 hover:-translate-y-1.5 overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 shadow-sm border border-gray-100/50 dark:border-gray-700/50 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 transition-colors duration-300 ${color}`}>
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-indigo-500" />
            </div>
        </div>
        <div className="relative z-10">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em]">{title}</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1.5 tracking-tight">
                {prefix}{value?.toLocaleString() || 0}
            </p>
        </div>
    </div>
);

export default function MemberDashboard({ stats }: { stats: any }) {
    if (!stats) return (
        <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500 font-medium border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-[2rem] animate-in fade-in duration-500">
            No activity data found.
        </div>
    );

    const chartDisplayData = stats?.memberChartData || [];

    return (
        <div className="space-y-8 bg-gray-50/50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 8 Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-5">
                <StatCard title="Active Ideas" value={stats?.summary?.activeIdeas} icon={CheckCircle} color="text-indigo-600 dark:text-indigo-400" />
                <StatCard title="Pending" value={stats?.summary?.pendingIdeas} icon={Clock} color="text-amber-500 dark:text-amber-400" />
                <StatCard title="Rejected" value={stats?.summary?.rejectedIdeas} icon={XCircle} color="text-rose-500 dark:text-rose-400" />
                <StatCard title="Purchased" value={stats?.summary?.purchasedIdeas} icon={ShoppingBag} color="text-indigo-600 dark:text-indigo-400" />

                <StatCard title="Comments" value={stats?.summary?.totalComments} icon={MessageSquare} color="text-indigo-600 dark:text-indigo-400" />
                <StatCard title="Upvotes" value={stats?.summary?.totalUpvotes} icon={ThumbsUp} color="text-indigo-600 dark:text-indigo-400" />
                <StatCard title="Downvotes" value={stats?.summary?.totalDownvotes} icon={ThumbsDown} color="text-rose-500 dark:text-rose-400" />
                <StatCard title="Total Posts" value={stats?.summary?.totalPosts} icon={LayoutDashboard} color="text-emerald-500 dark:text-emerald-400" />
            </div>

            {/* Analytics Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Engagement Bar Chart */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_-4px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Engagement Overview</h2>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-medium">Visualization of your contributions and interactions</p>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Metrics</span>
                        </div>
                    </div>

                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartDisplayData} margin={{ top: 25, right: 10, left: -20, bottom: 5 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={12} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.02)', radius: 16 }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(var(--background), 1)',
                                        borderRadius: '24px',
                                        border: '1px solid currentColor',
                                        padding: '14px 18px'
                                    }}
                                    itemStyle={{ color: '#4f46e5', fontWeight: 700 }}
                                    labelStyle={{ color: 'currentColor', fontWeight: 800 }}
                                />
                                <Bar dataKey="total" radius={[16, 16, 16, 16]} barSize={40}>
                                    {chartDisplayData.map((_: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'url(#memberIndigoGrad)' : 'url(#memberIndigoLightGrad)'} />
                                    ))}
                                    <LabelList dataKey="total" position="top" style={{ fill: '#6366f1', fontSize: 13, fontWeight: '900' }} offset={14} />
                                </Bar>
                                <defs>
                                    <linearGradient id="memberIndigoGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                                    </linearGradient>
                                    <linearGradient id="memberIndigoLightGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.6} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Line Chart */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_-4px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Activity Timeline</h2>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-medium">Trend movement of your profile activity over categories</p>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Trends</span>
                        </div>
                    </div>

                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartDisplayData} margin={{ top: 25, right: 20, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-800/60" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={12} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(var(--background), 1)',
                                        borderRadius: '24px',
                                        border: '1px solid currentColor',
                                        padding: '14px 18px'
                                    }}
                                    itemStyle={{ color: '#10b981', fontWeight: 700 }}
                                    labelStyle={{ color: 'currentColor', fontWeight: 800 }}
                                />
                                <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={4} dot={{ fill: '#10b981', r: 6, strokeWidth: 3 }} activeDot={{ r: 8, strokeWidth: 0 }}>
                                    <LabelList dataKey="total" position="top" style={{ fill: '#10b981', fontSize: 12, fontWeight: '800' }} offset={14} />
                                </Line>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}