import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Toaster } from "@/components/ui/toaster";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const user = {
    name: session.user.name || "",
    email: session.user.email || "",
    role: (session.user as any).role || "",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
