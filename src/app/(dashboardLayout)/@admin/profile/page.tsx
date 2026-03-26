/* eslint-disable @typescript-eslint/no-explicit-any */
import { userService } from "@/service/user.service";
import UserProfile from "@/utils/UserProfile/UserProfile";

export default async function ProfilePage() {
    const response = await userService.getSession()
    const userData = response?.data?.data || null;

    if (!userData) return <div className="p-10 text-center text-gray-500">User not found.</div>;

    return (
        <div className="p-4 md:p-8">
            <UserProfile user={userData} />
        </div>
    );
}