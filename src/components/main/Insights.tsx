"use client"

import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Insights = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All", "Innovation", "Technology", "Sustainability", "Community"];

    const blogs = [
        {
            id: 1,
            title: "The Future of Sustainable Innovation in 2026",
            excerpt: "Discover how eco-friendly technologies are shaping the next decade of startup ecosystems and global development.",
            author: "Mahmud Reza",
            date: "March 15, 2026",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 2,
            title: "How to Pitch Your Idea to Global Investors",
            excerpt: "Practical tips and strategies to make your business proposal stand out in a crowded marketplace.",
            author: "Sarah Jenkins",
            date: "March 12, 2026",
            category: "Innovation",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 3,
            title: "Top 5 Tech Stacks for Modern Web Apps",
            excerpt: "An in-depth look at why the T3 stack remains a powerhouse for full-stack developers this year.",
            author: "Rafsun",
            date: "March 10, 2026",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        }
    ];

    return (
        <div className="bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-100 min-h-screen">
            {/* Header Section */}
            <header className="py-16 -mt-11 border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            EcoSpark <span className="text-indigo-500">Insights</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Stay updated with the latest trends in innovation, technology, and community-driven success stories.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-500 transition-all"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#111113] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Post (Optional Layout) */}
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <article
                            key={blog.id}
                            className="group flex flex-col bg-white dark:bg-[#111113] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                        >
                            {/* Image Wrapper */}
                            <div className="relative h-52 w-full overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                                        <Calendar size={14} /> {blog.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={14} /> {blog.author}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                    {blog.excerpt}
                                </p>
                                <button className="flex items-center gap-2 text-indigo-500 font-bold text-sm hover:gap-3 transition-all">
                                    Read Article <ArrowRight size={16} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-16 flex justify-center gap-2">
                    <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-bold">1</button>
                    <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold">2</button>
                    <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold">Next</button>
                </div>
            </main>

            {/* Newsletter Subscription */}
            <section className="bg-indigo-50 dark:bg-indigo-500/5 py-16 mt-20 rounded-lg">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Get the latest ideas in your inbox</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                        Join our weekly newsletter to receive curated content and top community discussions.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 transition-all">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Insights;