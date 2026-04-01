/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

const TrendingIdeaCard = ({ idea, index }: { idea: any; index: number }) => {
    const isPositive = (idea.upvoteCount || 0) >= 0;
    return (
        <Link
            href={`/ideas/${idea.id}`}
            className="group flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 p-2 -m-2 rounded-xl transition-all duration-200"
        >
            {/* Rank Number - Updated to match top design colors */}
            <span className="text-2xl font-bold text-gray-600 dark:text-gray-400 group-hover:text-orange-200 transition-colors">
                0{index + 1}
            </span>

            <div className="flex-1 min-w-0">
                {/* Title - Updated hover to orange */}
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {idea.title}
                </h4>

                <div className="flex items-center gap-2 mt-1">
                    {/* Category Badge */}
                    <span className="text-[10px] font-medium px-7 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-zinc-400 rounded-full uppercase">
                        {idea.category || ""}
                    </span>

                    {/* Votes - Dynamic color based on positive/negative */}
                    <span className={`text-[11px] flex items-center gap-0.5 font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                        ) : (
                            <ArrowDownRight className="w-3 h-3" />
                        )}
                        {idea.upvoteCount || 0} votes
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default TrendingIdeaCard;