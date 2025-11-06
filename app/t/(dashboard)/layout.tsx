import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/teacher/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-svh w-full overflow-auto">
        {/* <SidebarTrigger />
        <ModeToggle /> */}
        {children}
      </main>
    </SidebarProvider>
  )
}