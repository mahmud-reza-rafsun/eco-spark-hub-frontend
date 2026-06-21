"use client";

import { useEffect, useRef, useState } from "react";
import IdeaCard from "./IdeaCard";
const ITEMS_PER_LOAD = 6;

export default function IdeasList({ ideas }: { ideas: any[] }) {
    const [visibleItems, setVisibleItems] = useState(6);
    const [loading, setLoading] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    !loading &&
                    visibleItems < ideas.length
                ) {
                    setLoading(true);

                    setTimeout(() => {
                        setVisibleItems((prev) =>
                            Math.min(prev + ITEMS_PER_LOAD, ideas.length)
                        );
                        setLoading(false);
                    }, 1000); // fake loading effect
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [loading, visibleItems, ideas.length]);

    return (
        <>
            {ideas.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ideas
                            .slice(0, visibleItems)
                            .map((idea) => (
                                <IdeaCard key={idea.id} idea={idea} />
                            ))}
                    </div>

                    {visibleItems < ideas.length && (
                        <div
                            ref={loadMoreRef}
                            className="flex justify-center py-10"
                        >
                            {loading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-sm text-gray-500">
                                        Loading more ideas...
                                    </p>
                                </div>
                            ) : (
                                <div className="h-10" />
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl mt-10 border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
                        No ideas found
                    </p>
                    <p className="text-gray-500 mt-1">
                        Try adjusting your search or filters
                    </p>
                </div>
            )}
        </>
    );
}