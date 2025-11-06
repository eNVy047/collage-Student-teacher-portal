"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "xoraxi",
    email: "xoraxi@iilm.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "IILM University",
      logo: GalleryVerticalEnd,
      plan: "Gr. Noida",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/t/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Upcomming Classes",
          url: "/t/dashboard",
        },
         {
          title: "Profile",
          url: "/t/dashboard/profile",
        },
        {
          title: "Announcements",
          url: "/t/dashboard/announcements",
        },
      ],
    },
    {
      title: "Classes",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Upcomming Classes",
          url: "/t/classes",
        },
      ],
    },
    {
      title: "Courses",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Notes",
          url: "/t/courses/notes",
        },
      ],
    },
    {
      title: "Notice",
      url: "/t/notice/primary",
      icon: BookOpen,
      items: [
        {
          title: "Important",
          url: "/t/notice/important",
        },
        {
          title: "Primary",
          url: "/t/notice/primary",
        },
        {
          title: "Starred",
          url: "/t/notice/starred",
        }
      ],
    },
    {
      title: "Finances",
      url: "/t/finances",
      icon: BookOpen,
      items: [
        {
          title: "Payments",
          url: "/s/finances",
        },
        {
          title: "Limits",
          url: "/s/finances/limits",
        },
      ],
    },
    {
      title: "Settings",
      url: "/s/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/s/settings/general",
        },
        {
          title: "Team",
          url: "/s/settings/team",
        },
        {
          title: "Help & Support",
          url: "/s/settings/help-support",
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
