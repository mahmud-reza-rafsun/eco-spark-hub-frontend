/* eslint-disable @typescript-eslint/no-explicit-any */
// page.tsx

import { ideaService } from "@/service/idea.service";
import IdeaSearchFilters from "../_components/PostIdea/IdeaSearchFilters";
import IdeaCard from "../_components/PostIdea/IdeaCard";

export default async function IdeasPage({
    searchParams,
}: {
    searchParams: Promise<{ searchTerm?: string; sortBy?: string; categoryId?: string }>;
}) {
    const params = await searchParams;
    const res = await ideaService.getAllIdeas({
        searchTerm: params.searchTerm,
        sortBy: params.sortBy,
        categoryId: params.categoryId
    });

    const ideas = res?.data?.data || [];

    return (
        <div className="container mx-auto py-8">
            <IdeaSearchFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {ideas.map((idea: any) => (
                    <IdeaCard key={idea.id} idea={idea} />
                ))}
            </div>
        </div>
    );
}