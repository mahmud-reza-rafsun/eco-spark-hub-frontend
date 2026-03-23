import { User } from "./user.interface";

export interface Category {
    id: string;
    content: string;
    user: User;
    replies?: Comment[];
    createdAt: string;
}

export interface createCategory {
    name: string,
    slug: string
}