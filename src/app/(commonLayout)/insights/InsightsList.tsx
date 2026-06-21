"use client";

import { useEffect, useRef, useState } from "react";
import { getAllInshight } from "@/interface/insights.interface";
import InsightsCard from "./InsightsCard";

const ITEMS_PER_LOAD = 6;

export default function InsightsList({
    blogs,
}: {
    blogs: getAllInshight[];
}) {
    const [visibleItems, setVisibleItems] = useState(6);
    const [loading, setLoading] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    !loading &&
                    visibleItems < blogs.length
                ) {
                    setLoading(true);

                    setTimeout(() => {
                        setVisibleItems((prev) =>
                            Math.min(prev + ITEMS_PER_LOAD, blogs.length)
                        );

                        setLoading(false);
                    }, 1200);
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
    }, [visibleItems, loading, blogs.length]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs
                    .slice(0, visibleItems)
                    .map((blog) => (
                        <InsightsCard
                            key={blog.id}
                            blog={blog}
                        />
                    ))}
            </div>

            {visibleItems < blogs.length && (
                <div
                    ref={loadMoreRef}
                    className="flex justify-center py-10"
                >
                    {loading ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-gray-500">
                                Loading more insights...
                            </p>
                        </div>
                    ) : (
                        <div className="h-10" />
                    )}
                </div>
            )}
        </>
    );
}