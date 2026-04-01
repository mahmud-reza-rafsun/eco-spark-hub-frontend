"use server"
import { trendingService } from "@/service/trending.service";

export const getTrendingIdeasAction = async () => {
    return await trendingService.getTrendingIdea();
};