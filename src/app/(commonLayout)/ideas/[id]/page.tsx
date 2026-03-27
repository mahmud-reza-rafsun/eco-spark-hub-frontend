import { notFound } from "next/navigation";
import CommentSection from "../../_components/PostIdea/CommentItems/CommentSection";
import CommentIdeaCard from "../../_components/PostIdea/CommentItems/CommentIdeaCard";
import { ideaService } from "@/service/idea.service";
import { CommentService } from "@/service/comment.service";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    // ২. Params await করা (Next.js 15+ এর জন্য বাধ্যতামূলক)
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // ৩. আপনার দেওয়া স্টাইলে প্যারালাল ডাটা ফেচিং
    // (সরাসরি ideaService.getSingleIdea ব্যবহার করা হয়েছে)
    const [ideaRes, commentRes] = await Promise.all([
        ideaService.getSingleIdea(id),
        CommentService.getCommentsByIdeaId(id)
    ]);

    const idea = ideaRes.data;
    const comments = commentRes?.data || [];

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl mx-auto px-4">

                {/* ৫. টপ সেকশনে আপনার কাস্টম আইডিয়া কার্ড */}
                <div className="mb-10 transform transition-all duration-300">
                    <CommentIdeaCard idea={idea} />
                </div>

                {/* ৬. কমেন্ট সেকশন কন্টেইনার (Rounded & Bordered ডিজাইন) */}
                <div className="bg-gray-50 dark:bg-[#0b0f1a] rounded-[2.5rem] p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <CommentSection
                        ideaId={id}
                        initialComments={comments}
                        authorId={idea.authorId}
                    />
                </div>
            </div>
        </div>
    );
}