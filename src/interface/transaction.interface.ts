export interface IPayment {
    id: string;
    amount: number;
    transactionId: string;
    status: "PAID" | "UNPAID";
    createdAt: string;
    user: {
        name: string;
        email: string;
        image: string | null;
    };
    idea: {
        title: string;
        price: number;
    };
}