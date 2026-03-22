/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IdeaCardProps {
    idea: {
        id: string;
        title: string;
        problem: string;
        status: string;
        author: {
            name: string;
            image?: string | null;
        };
        category: {
            slug: string;
        };
        _count: {
            votes: number;
        };
        comments: any[];
    };
}