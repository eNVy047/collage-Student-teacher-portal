import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/student/app-sidebar"

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-svh w-full overflow-auto">
        {children}
      </main>
    </SidebarProvider>
  )
}