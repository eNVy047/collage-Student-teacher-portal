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

import classesData from "@/app/t/(dashboard)/classes/data.json"
import coursesData from "@/app/t/(dashboard)/courses/data.json"

// Build dynamic items for Classes and Courses from respective data.json files
const dynamicClassesItems = (classesData as { classes?: { name: string; slug?: string }[] }).classes?.map(
  (c) => ({ title: c.name, url: `/t/classes${c.slug ? "/" + c.slug : ""}` })
) ?? []

const dynamicCoursesItems = (coursesData as { courses?: { name: string; slug?: string }[] }).courses?.map(
  (c) => ({ title: c.name, url: `/t/courses${c.slug ? "/" + c.slug : ""}` })
) ?? []

// Sidebar data
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
      url: "/t/classes",
      icon: Bot,
      items: dynamicClassesItems.length ? dynamicClassesItems : [
        { title: "Classes Overview", url: "/t/classes" }
      ],
    },
    {
      title: "Courses",
      url: "/t/courses",
      icon: Bot,
      items: dynamicCoursesItems.length ? dynamicCoursesItems : [
        { title: "Courses Overview", url: "/t/courses" }
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
      url: "/t/finances/payments",
      icon: BookOpen,
      items: [
        {
          title: "Payments",
          url: "/t/finances/payments",
        },
        {
          title: "Limits",
          url: "/t/finances/limits",
        },
      ],
    },
    {
      title: "Settings",
      url: "/t/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/t/settings/general",
        },
        {
          title: "Team",
          url: "/t/settings/team",
        },
        {
          title: "Help & Support",
          url: "/t/settings/help-support",
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
