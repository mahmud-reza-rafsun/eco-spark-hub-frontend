export interface IdeaData {
    id: string;
    title: string;
    problem: string;
    solution: string;
    description: string;
    images?: string;
    price?: number;
    category?: {
        id: string;
        name: string;
    } | string;
    author?: {
        name: string;
        avatar?: string;
        role?: string;
    };
    createdAt?: string;
    upvotes: number;
    downvotes: number;
    userVote: any;
}