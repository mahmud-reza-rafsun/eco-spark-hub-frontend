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
  <div className="group relative bg-white/40 dark:bg-[#1c1c1d]/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 dark:border-gray-800/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.15)] hover:border-indigo-500/40 hover:-translate-y-1.5 overflow-hidden">
    {/* Background Decorative Glow */}
    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-2xl bg-white/80 dark:bg-[#252526]/80 shadow-sm border border-gray-100/50 dark:border-gray-700/30 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 transition-colors duration-300 ${color}`}>
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

export default function AdminDashboard({ stats }: { stats: any }) {
  if (!stats) return (
    <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-500 font-medium border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white/20 dark:bg-[#1c1c1d]/25 backdrop-blur-sm rounded-[2rem] animate-in fade-in duration-500">
      No analytics data available at the moment.
    </div>
  );

  // Ensuring chartData exists and filtering
  const chartDisplayData = stats?.chartData?.filter((item: any) => item.name !== "Revenue") || [];

  return (
    <div className="space-y-8 p-1 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 8 Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-5">
        <StatCard title="Total Admins" value={stats?.summary?.totalAdmin} icon={UserCog} color="text-indigo-600 dark:text-indigo-400" />
        <StatCard title="Total Users" value={stats?.summary?.totalUser} icon={Users} color="text-indigo-600 dark:text-indigo-400" />
        <StatCard title="Total Ideas" value={stats?.summary?.totalIdea} icon={Lightbulb} color="text-indigo-600 dark:text-indigo-400" />
        <StatCard title="Categories" value={stats?.summary?.totalCategory} icon={Grid3X3} color="text-indigo-600 dark:text-indigo-400" />

        <StatCard title="Revenue" value={stats?.summary?.totalRevenue} icon={DollarSign} color="text-emerald-500 dark:text-emerald-400" prefix="$" />
        <StatCard title="Comments" value={stats?.summary?.totalComments} icon={MessageSquare} color="text-indigo-600 dark:text-indigo-400" />
        <StatCard title="Upvotes" value={stats?.summary?.totalUpvotes} icon={ThumbsUp} color="text-indigo-600 dark:text-indigo-400" />
        <StatCard title="Downvotes" value={stats?.summary?.totalDownvotes} icon={ThumbsDown} color="text-rose-500 dark:text-rose-400" />
      </div>

      {/* Advanced Chart Section */}
      <div className="bg-white/40 dark:bg-[#1c1c1d]/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 dark:border-gray-800/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Eco Spark Performance</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-medium">Metric distribution across all interactive modules</p>
          </div>
          <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/40 px-4 py-2 rounded-2xl border border-gray-100/80 dark:border-gray-700/30 shadow-sm self-start sm:self-center">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-300 dark:bg-indigo-400/40"></div>
            </div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">Live Metrics</span>
          </div>
        </div>

        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDisplayData} margin={{ top: 25, right: 10, left: -20, bottom: 5 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                dy={12}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: 'rgba(99, 102, 241, 0.04)', radius: 16 }}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.04)',
                  padding: '14px 18px',
                }}
                itemStyle={{ color: '#4f46e5', fontWeight: 700 }}
                labelStyle={{ color: '#1e293b', fontWeight: 800, marginBottom: '4px' }}
              />
              <Bar
                dataKey="total"
                radius={[16, 16, 16, 16]}
                barSize={44}
              >
                {chartDisplayData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? 'url(#indigoGrad)' : 'url(#indigoLightGrad)'}
                  />
                ))}
                <LabelList
                  dataKey="total"
                  position="top"
                  style={{ fill: '#6366f1', fontSize: 13, fontWeight: '900', letterSpacing: '-0.02em' }}
                  offset={14}
                />
              </Bar>

              {/* Gradient Definitions for Chart Bars */}
              <defs>
                <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="indigoLightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}