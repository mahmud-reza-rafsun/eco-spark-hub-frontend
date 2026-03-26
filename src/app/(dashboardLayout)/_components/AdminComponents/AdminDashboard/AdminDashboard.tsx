/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Users, UserCog, Lightbulb, Grid3X3,
  DollarSign, MessageSquare, ThumbsUp, ThumbsDown,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, LabelList, Cell
} from 'recharts';

// Fixed StatCard Props interface
interface StatCardProps {
  title: string;
  value: number;
  icon: any;
  color: string;
  prefix?: string;
}

const StatCard = ({ title, value, icon: Icon, color, prefix = "" }: StatCardProps) => (
  <div className="group bg-white dark:bg-[#1c1c1d] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-xl hover:border-indigo-500/20 hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-[#252526] group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors ${color}`}>
        <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
      </div>
      <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{title}</p>
      <p className="text-xl font-black text-gray-900 dark:text-white mt-1">
        {prefix}{value?.toLocaleString() || 0}
      </p>
    </div>
  </div>
);

export default function AdminDashboard({ stats }: { stats: any }) {
  if (!stats) return (
    <div className="flex items-center justify-center h-64 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-3xl">
      No analytics data available at the moment.
    </div>
  );

  // Ensuring chartData exists and filtering
  const chartDisplayData = stats?.chartData?.filter((item: any) => item.name !== "Revenue") || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 8 Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-6">
        <StatCard title="Total Admins" value={stats.summary.totalAdmin} icon={UserCog} color="text-indigo-600" />
        <StatCard title="Total Users" value={stats.summary.totalUser} icon={Users} color="text-indigo-600" />
        <StatCard title="Total Ideas" value={stats.summary.totalIdea} icon={Lightbulb} color="text-indigo-600" />
        <StatCard title="Categories" value={stats.summary.totalCategory} icon={Grid3X3} color="text-indigo-600" />

        <StatCard title="Revenue" value={stats.summary.totalRevenue} icon={DollarSign} color="text-emerald-500" prefix="$" />
        <StatCard title="Comments" value={stats.summary.totalComments} icon={MessageSquare} color="text-indigo-600" />
        <StatCard title="Upvotes" value={stats.summary.totalUpvotes} icon={ThumbsUp} color="text-indigo-600" />
        <StatCard title="Downvotes" value={stats.summary.totalDownvotes} icon={ThumbsDown} color="text-rose-500" />
      </div>

      {/* Advanced Chart Section */}
      <div className="bg-white dark:bg-[#1c1c1d] p-8 rounded-[2rem] shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Eco Spark Performance</h2>
            <p className="text-sm text-gray-400 mt-1 font-medium">Metric distribution across all interactive modules</p>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-200"></div>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDisplayData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
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
                barSize={50}
              >
                {chartDisplayData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'}
                  />
                ))}
                <LabelList
                  dataKey="total"
                  position="top"
                  style={{ fill: '#4f46e5', fontSize: 14, fontWeight: '800' }}
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