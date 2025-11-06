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
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Upcomming Classes",
          url: "/s/dashboard",
        },
         {
          title: "Profile",
          url: "/s/dashboard/profile",
        },
        {
          title: "Announcements",
          url: "/s/dashboard/announcements",
        },
      ],
    },
    {
      title: "Courses",
      url: "#",
      icon: Bot,
      items: [
        
        {
          title: "Home",
          url: "/s/courses",
        },
        {
          title: "Notes",
          url: "/s/courses/notes",
        },
        {
          title: "Assignments",
          url: "/s/courses/assignments",
        },
        {
          title: "Exams",
          url: "/s/courses/exams",
        },
        {
          title: "Attendence",
          url: "/s/courses/attendence",
        },
        {
          title: "Results",
          url: "/s/courses/results",
        }
      ],
    },
    {
      title: "Scheduler",
      url: "/s/scheduler",
      icon: BookOpen,
      items: [
        
        {
          title: "Home",
          url: "/s/scheduler",
        },
        {
          title: "Workshops",
          url: "/s/scheduler/workshops",
        },
        {
          title: "Holidays",
          url: "/s/scheduler/holidays",
        },
        {
          title: "Events",
          url: "/s/scheduler/events",
        }
      ],
    },
    {
      title: "Finances",
      url: "/s/finances",
      icon: BookOpen,
      items: [
        {
          title: "Home",
          url: "/s/finances",
        },
        {
          title: "Billing",
          url: "/s/finances/billing",
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
          title: "Home",
          url: "/s/settings",
        },
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
