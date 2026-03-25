/* eslint-disable @typescript-eslint/no-explicit-any */
import { ideaService } from "@/service/idea.service";
import IdeaCard from "../_components/PostIdea/IdeaCard";
import Pagination from "../_components/PostIdea/IdeaPagination";
import IdeaSearchFilters from "../_components/PostIdea/IdeaSearchFilters";

export default async function IdeasPage({
    searchParams,
}: {
    searchParams: { page?: string; limit?: string };
}) {
    const currentPage = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;

    const res = await ideaService.getAllIdeas(currentPage, limit);
    const ideas = res?.data?.data || [];
    const meta = res?.data?.meta;

    return (
        <div className="">
            <div className="">
                <IdeaSearchFilters />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 mt-20">
                {ideas.map((idea: any) => (
                    <IdeaCard key={idea.id} idea={idea} />
                ))}
            </div>

            {/* Pagination UI */}
            {/* <div className="">
                <Pagination
                    totalPages={meta?.totalPage || 1}
                    currentPage={currentPage}
                />
            </div> */}
        </div>
    );
}