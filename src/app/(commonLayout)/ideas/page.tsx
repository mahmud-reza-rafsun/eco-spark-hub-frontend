/* eslint-disable @typescript-eslint/no-explicit-any */
import { ideaService } from "@/service/idea.service";
import IdeaSearchFilters from "../_components/PostIdea/IdeaSearchFilters";
import IdeaCard from "../_components/PostIdea/IdeaCard";
import Pagination from "../_components/PostIdea/IdeaPagination";

export default async function IdeasPage({
    searchParams,
}: {
    searchParams: Promise<{
        searchTerm?: string;
        sortBy?: string;
        categoryId?: string;
        page?: string;
    }>;
}) {
    const params = await searchParams;

    const currentPage = Number(params.page) || 1;
    const limit = 6;
    const res = await ideaService.getAllIdeas({
        searchTerm: params.searchTerm,
        sortBy: params.sortBy,
        categoryId: params.categoryId,
        page: currentPage.toString(),
        limit: limit.toString()
    });

    const ideas = res?.data?.data.data || [];
    const meta = res?.data?.data.meta || [];

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <IdeaSearchFilters />
            </div>
            {ideas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {ideas.map((idea: any) => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl mt-10 border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <p className="text-xl font-medium text-gray-600 dark:text-gray-300">No ideas found</p>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                </div>
            )}

            {meta && meta.totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                    <Pagination
                        totalPages={meta.totalPages}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
}