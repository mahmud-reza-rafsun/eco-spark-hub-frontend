export const dynamic = "force-dynamic";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ideaSerive } from "@/service/idea.service";
import IdeaCard from "./IdeaCard";

export default async function page() {
    const { data, error } = await ideaSerive.getIdea();

    if (error || !data) {
        return <p className="text-center text-red-500 font-bold">Error loading ideas!</p>;
    }

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
            {data.data.map((idea: any) => (
                <IdeaCard key={idea.id} idea={idea} />
            ))}
        </div>
    );
}