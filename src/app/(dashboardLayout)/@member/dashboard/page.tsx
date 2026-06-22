import { memberService } from "@/service/member.service";
import MemberDashboard from "../../_components/MemberComponents/MemberDashboard/MemberDashboard";

export default async function Page() {
    // Fetching data on the server side
    const response = await memberService.getMemberStats();
    const stats = response?.data || null;

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 md:p-8 rounded-2xl">
            <div className="">

                <MemberDashboard stats={stats} />
            </div>
        </div>
    );
}