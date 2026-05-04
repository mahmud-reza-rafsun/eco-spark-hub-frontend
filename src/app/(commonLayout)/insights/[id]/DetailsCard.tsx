import { getAllInshight } from '@/interface/insights.interface';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Share2, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DetailsCard({ blog }: { blog: getAllInshight }) {
    console.log(blog)
    const formattedDate = blog.createdAt ? format(new Date(blog.createdAt), 'MMMM dd, yyyy') : '';
    return (
        <div>
            <div className="bg-white dark:bg-[#09090b] min-h-screen text-gray-900 dark:text-gray-100 pb-20">
                {/* Navigation Header */}
                <nav className="border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md z-10">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-indigo-500 transition-colors">
                            <ArrowLeft size={18} /> Back to Insights
                        </Link>
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>
                </nav>

                <main className="container mx-auto px-4 md:px-6 pt-10">
                    <article className="max-w-4xl mx-auto">
                        {/* Category & Title */}
                        <div className="text-center mb-10">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 text-xs font-bold mb-6 uppercase tracking-wider">
                                {blog.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
                                {blog.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                        <User size={16} className="text-indigo-500" />
                                    </div>
                                    <span className="font-medium">{blog.author.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formattedDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="relative h-[300px] md:h-[500px] w-full mb-12 rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Blog Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-headings:font-bold">
                            <p className="text-xl leading-relaxed mb-8 font-medium italic border-l-4 border-indigo-500 pl-6 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-r-xl">
                                Climate change is driving a new era of technological advancement.
                            </p>

                            <div className="text-lg leading-relaxed space-y-6">
                                {blog.description}
                            </div>

                            <h2 className="text-2xl mt-10 mb-4">Why it matters?</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3">
                            <span className="text-sm font-bold mr-2 self-center">Tags:</span>
                            {["EcoTech", "Future", "Green"].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </article>
                </main>
            </div>
        </div>
    )
}
