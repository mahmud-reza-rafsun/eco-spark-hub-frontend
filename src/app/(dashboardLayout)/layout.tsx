import { Roles } from "../constants/Roles";

export default async function DashboardLayout({
    children,
    admin,
    member
}: {
    children: React.ReactNode
    admin: React.ReactNode;
    member: React.ReactNode;
}) {
    const userRole = "ADMIN"

    return (

        <main className="p-4 relative pt-6 min-h-[calc(100vh-4rem)] gradientBg">
            {userRole === Roles.member ? member : userRole === Roles.admin ? admin : member}
            {children}
        </main>

    );
}