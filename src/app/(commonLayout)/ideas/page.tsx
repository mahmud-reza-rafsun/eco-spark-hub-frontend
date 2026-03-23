/* eslint-disable @typescript-eslint/no-explicit-any */
import { ideaService } from "@/service/idea.service";
import IdeaCard from "../_components/PostIdea/IdeaCard";
import Pagination from "../_components/PostIdea/IdeaPagination";

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
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">All Ideas</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((idea: any) => (
                    <IdeaCard key={idea.id} idea={idea} />
                ))}
            </div>

            {/* Pagination UI */}
            <div className="mt-12">
                <Pagination
                    totalPages={meta?.totalPage || 1}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}