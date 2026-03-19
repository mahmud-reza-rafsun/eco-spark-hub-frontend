import Navbar from "@/components/layout/Navbar"
import SideBar from "@/components/layout/SideBar";
import { userSerive } from "@/service/user.service"

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
    const sessionResponse = await userSerive.getSession();
    const user = sessionResponse?.data?.user || undefined;
    return (
        <div>
            <Navbar user={user} />
            <div className="flex ">
                <SideBar user={user} />
                {children}
            </div>
        </div>
    )
}