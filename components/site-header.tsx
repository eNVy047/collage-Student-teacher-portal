import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import ActionSearchBar from "./kokonutui/action-search-bar"
import { SideDrawerDemo } from "./kokonutui/notification-side"

export function SiteHeader(props: { title?: string }) {
  return (
    <header className="flex w-full  shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full px-3 items-center gap-1 lg:gap-2 justify-between h-(--header-height)">
        <div className="flex">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-6"
          />
          <h1 className="text-base font-medium">{props.title}</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 p-2">
          <ActionSearchBar />
          <ModeToggle />
          <SideDrawerDemo />
        </div>
      </div>
    </header>
  )
} 
