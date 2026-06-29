export interface DonationPayload {
    fullName: string;
    email: string;
    paymentMethod: string;
    amount: number;
    payPhoneNumber: string;
    transactionId: string;
    description: string;
}
