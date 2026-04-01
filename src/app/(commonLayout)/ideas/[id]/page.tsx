import CommentSection from "../../_components/PostIdea/CommentItems/CommentSection";
import CommentIdeaCard from "../../_components/PostIdea/CommentItems/CommentIdeaCard";
import { ideaService } from "@/service/idea.service";


interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const res = await ideaService.getSingleIdea(id);
    const idea = res.data
    const comments = res.data.comments
    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-10 transform transition-all duration-300">
                    <CommentIdeaCard idea={idea} />
                </div>

                <div className="bg-gray-50 dark:bg-[#0b0f1a] rounded-lg md:px-5 md:py-5 border border-gray-100 dark:border-gray-800">
                    <CommentSection
                        ideaId={id}
                        initialComments={comments}
                        authorId={idea?.authorId}
                    />
                </div>
            </div>
        </div>
    );
}