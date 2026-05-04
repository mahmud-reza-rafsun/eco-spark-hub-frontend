import { insightsService } from "@/service/insight.service";
import DetailsCard from "./DetailsCard";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({ params }: PageProps) {
    const { id } = await params;

    const response = await insightsService.getSingleInsights(id);

    const blog = response?.data;

    return (
        <main>
            <DetailsCard blog={blog} />
        </main>
    );
};