import { getAllInshight } from '@/interface/insights.interface';
import { insightsService } from '@/service/insight.service';
import InsightsCard from './InsightsCard';

export default async function InsightsPage() {
    const response = await insightsService.getAllInsights();
    const categories = response?.data || [];

    return (
        <div className="bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-100 min-h-screen">
            {/* Header Section */}
            <header className="py-10 -mt-20 border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                            EcoSpark <span className="text-indigo-500">Insights</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Stay updated with the latest trends in innovation, technology, and community-driven success stories.
                        </p>
                    </div>
                </div>
            </header>

            {/* Featured Post (Optional Layout) */}
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((blog: getAllInshight) => (
                        <InsightsCard key={blog.id} blog={blog} />

                    ))}
                </div>
            </main>

        </div>
    );
};