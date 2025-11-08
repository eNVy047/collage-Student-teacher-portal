import * as React from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarInset>
      <div className="flex flex-col min-h-screen">
        <SiteHeader title="Settings" />
        <main className="flex-1 overflow-auto min-h-svh w-full">{children}</main>
      </div>
    </SidebarInset>
  )
}

