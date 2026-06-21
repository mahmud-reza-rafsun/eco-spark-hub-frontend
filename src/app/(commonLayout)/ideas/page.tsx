import { ideaService } from "@/service/idea.service";
import IdeaSearchFilters from "../_components/PostIdea/IdeaSearchFilters";
import IdeasList from "../_components/PostIdea/IdeasList";

export default async function IdeasPage({
    searchParams,
}: {
    searchParams: Promise<{
        searchTerm?: string;
        sortBy?: string;
        categoryId?: string;
    }>;
}) {
    const params = await searchParams;

    const res = await ideaService.getAllIdeas({
        searchTerm: params.searchTerm,
        sortBy: params.sortBy,
        categoryId: params.categoryId,
    });

    const ideas = res?.data?.data.data || [];

    return (
        <div className="container mx-auto -my-[72px] py-8 px-4">
            <div className="mb-10">
                <IdeaSearchFilters />
            </div>

            <IdeasList ideas={ideas} />
        </div>
    );
}