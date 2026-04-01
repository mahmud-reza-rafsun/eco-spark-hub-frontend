/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flame, RefreshCcw } from "lucide-react";
import { useEffect, useState, useCallback } from "react"
import TrendingIdeaCard from "./TrendingIdeaCard";
import { getTrendingIdeasAction } from "./TrendingAction";

const TrendingIdeas = () => {
    const [ideas, setIdeas] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getTrendingIdeasAction();
            if (res.error) {
                setError(res.error);
            } else {
                setIdeas(res.data || []);
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-500/30 rounded-lg">
                    <Flame className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Trending Ideas</h3>
            </div>

            <div className="space-y-5">
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-12 bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-xl w-full" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-4">
                        <p className="text-xs text-rose-500 mb-2">{error}</p>
                        <button
                            onClick={loadData}
                            className="text-[10px] font-medium text-indigo-500 flex items-center gap-1 mx-auto hover:text-indigo-600 transition-colors"
                        >
                            <RefreshCcw size={10} /> Retry
                        </button>
                    </div>
                ) : ideas.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        {ideas.slice(0, 5).map((idea, index) => (
                            <TrendingIdeaCard key={idea.id || index} idea={idea} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-zinc-500 text-center py-4 font-medium">No trending ideas found</p>
                )}
            </div>
        </div>
    );
};

export default TrendingIdeas;