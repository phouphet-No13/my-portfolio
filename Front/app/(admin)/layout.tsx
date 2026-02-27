import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/layout/sidebar";
import Topbar from "@/app/components/layout/topbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fafafb] dark:bg-black text-black dark:text-white flex">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
