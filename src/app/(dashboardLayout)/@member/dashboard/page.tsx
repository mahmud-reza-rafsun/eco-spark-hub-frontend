import { memberService } from "@/service/member.service";
import MemberDashboard from "../../_components/MemberComponents/MemberDashboard/MemberDashboard";

export default async function Page() {
    // Fetching data on the server side
    const response = await memberService.getMemberStats();
    const stats = response?.data || null;
    console.log(stats)

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#121212] p-4 md:p-8 rounded-lg">
            <div className="">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Platform Analytics
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Real-time overview of your ecosystem performance.
                    </p>
                </div>

                <MemberDashboard stats={stats} />
            </div>
        </div>
    );
}