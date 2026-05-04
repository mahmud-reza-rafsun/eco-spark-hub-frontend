/* eslint-disable @typescript-eslint/no-explicit-any */
export interface getAllInshight {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    author: {
        name: string;
        image?: string | null;
    };
};


export interface createInshight {
    title: string;
    category: string;
    image: string;
    description: string;
};

export interface createInshightCategory {
    name: string;
    slug: string;
};