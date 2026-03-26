/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
    CheckCircle, Clock, XCircle, ShoppingBag,
    MessageSquare, ThumbsUp, ThumbsDown, LayoutDashboard,
    ArrowUpRight
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer, LabelList, Cell
} from 'recharts';

interface StatCardProps {
    title: string;
    value: number;
    icon: any;
    color: string;
    prefix?: string;
}

const StatCard = ({ title, value, icon: Icon, color, prefix = "" }: StatCardProps) => (
    <div className="group bg-white dark:bg-[#1c1c1d] p-4 lg:p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-xl hover:border-indigo-500/20 hover:-translate-y-1">
        <div className="flex justify-between items-start mb-3">
            <div className={`p-2.5 rounded-xl bg-gray-50 dark:bg-[#252526] group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors ${color}`}>
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-500" />
        </div>
        <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">
                {title}
            </p>
            <p className="text-lg xl:text-xl font-black text-gray-900 dark:text-white mt-0.5 truncate">
                {prefix}{value?.toLocaleString() || 0}
            </p>
        </div>
    </div>
);

export default function MemberDashboard({ stats }: { stats: any }) {
    if (!stats) return (
        <div className="flex items-center justify-center h-64 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-3xl">
            No activity data found.
        </div>
    );

    console.log(stats.summary.purchasedIdeas)
    // Using memberChartData from API
    const chartDisplayData = stats?.memberChartData || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Metric Grid - Responsive 8 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-6">
                <StatCard title="Active Ideas" value={stats.summary.activeIdeas} icon={CheckCircle} color="text-indigo-600" />
                <StatCard title="Pending" value={stats.summary.pendingIdeas} icon={Clock} color="text-indigo-600" />
                <StatCard title="Rejected" value={stats.summary.rejectedIdeas} icon={XCircle} color="text-rose-500" />
                <StatCard title="Purchased" value={stats.summary.purchasedIdeas} icon={ShoppingBag} color="text-indigo-600" />

                <StatCard title="Comments" value={stats.summary.totalComments} icon={MessageSquare} color="text-indigo-600" />
                <StatCard title="Upvotes" value={stats.summary.totalUpvotes} icon={ThumbsUp} color="text-indigo-600" />
                <StatCard title="Downvotes" value={stats.summary.totalDownvotes} icon={ThumbsDown} color="text-indigo-600" />
                <StatCard title="Total Posts" value={stats.summary.totalPosts} icon={LayoutDashboard} color="text-emerald-500" />
            </div>

            {/* Member Activity Chart */}
            <div className="bg-white dark:bg-[#1c1c1d] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Engagement Overview</h2>
                        <p className="text-sm text-gray-400 mt-1 font-medium">Visualization of your contributions and interactions</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <div className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 text-[10px] font-bold uppercase">Live Data</div>
                    </div>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDisplayData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                                dy={10}
                            />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: '#f1f5f9', radius: 10 }}
                                contentStyle={{
                                    borderRadius: '20px',
                                    border: 'none',
                                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                    padding: '12px 16px'
                                }}
                            />
                            <Bar
                                dataKey="total"
                                radius={[12, 12, 12, 12]}
                                barSize={40}
                            >
                                {chartDisplayData.map((_entry: any, index: number) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'}
                                    />
                                ))}
                                <LabelList
                                    dataKey="total"
                                    position="top"
                                    style={{ fill: '#4f46e5', fontSize: 12, fontWeight: '800' }}
                                    offset={15}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}