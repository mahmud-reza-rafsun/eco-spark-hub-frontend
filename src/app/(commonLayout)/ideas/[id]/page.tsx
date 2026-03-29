import { notFound } from "next/navigation";
import CommentSection from "../../_components/PostIdea/CommentItems/CommentSection";
import CommentIdeaCard from "../../_components/PostIdea/CommentItems/CommentIdeaCard";
import { ideaService } from "@/service/idea.service";
import { CommentService } from "@/service/comment.service";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const [ideaRes, commentRes] = await Promise.all([
        ideaService.getSingleIdea(id),
        CommentService.getCommentsByIdeaId(id)
    ]);

    // ডাটা না থাকলে এরর হ্যান্ডেলিং
    if (!ideaRes?.data) {
        return notFound();
    }

    const idea = ideaRes.data;
    const comments = commentRes?.data || [];

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-10 transform transition-all duration-300">
                    <CommentIdeaCard idea={idea} />
                </div>

                <div className="bg-gray-50 dark:bg-[#0b0f1a] rounded-[2.5rem] p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <CommentSection
                        ideaId={id}
                        initialComments={comments}
                        // এখানে idea?.authorId নিরাপদভাবে পাঠানো হয়েছে
                        authorId={idea?.authorId}
                    />
                </div>
            </div>
        </div>
    );
}