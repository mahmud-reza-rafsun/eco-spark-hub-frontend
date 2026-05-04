/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllInshight } from '@/interface/insights.interface';
import { format } from 'date-fns';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function InsightsCard({ blog }: { blog: getAllInshight }) {
    const formattedDate = blog?.createdAt
        ? format(new Date(blog.createdAt), 'MMMM dd, yyyy')
        : 'No date';
    return (
        <article
            className="group flex flex-col bg-white dark:bg-[#111113] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
        >
            {/* Image Wrapper */}
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-indigo-500 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                        <Tag size={12} /> {blog.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formattedDate}
                    </div>
                    <div className="flex items-center gap-1">
                        <User size={14} /> {blog.author.name}
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors">
                    {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
                    {blog.description}
                </p>
                <Link href={`/insights/${blog.id}`} className="flex items-center gap-2 cursor-pointer text-indigo-500 font-bold text-sm hover:gap-3 transition-all">
                    Read Article <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
}