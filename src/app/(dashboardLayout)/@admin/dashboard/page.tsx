import AdminDashboard from "../../_components/AdminComponents/AdminDashboard/AdminDashboard";
import { adminService } from "@/service/admin.service";

export default async function Page() {
    // Fetching data on the server side
    const response = await adminService.getAdminStats();
    const stats = response?.data || null;

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 md:p-8 rounded-2xl">
            <div className="">
                <AdminDashboard stats={stats} />
            </div>
        </div>
    );
}