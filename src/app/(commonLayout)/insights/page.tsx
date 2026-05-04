import { getAllInshight } from '@/interface/insights.interface';
import { insightsService } from '@/service/insight.service';
import InsightsCard from './InsightsCard';

export default async function InsightsPage() {

    const response = await insightsService.getAllInsights();
    // console.log(response.data)
    const categories = response?.data || [];
    console.log(categories)

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
                    {/* <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#111113] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div> */}
                </div>
            </header>

            {/* Featured Post (Optional Layout) */}
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((blog: getAllInshight) => (
                        <InsightsCard key={blog.id} blog={blog} />

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