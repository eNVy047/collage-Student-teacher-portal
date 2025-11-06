"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, User, Users, HelpCircle, Bell, Shield, Globe, Palette } from "lucide-react"
import Link from "next/link"

const settingsCategories = [
  {
    title: "General",
    description: "Account settings and preferences",
    icon: Settings,
    href: "/s/settings/general",
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    title: "Team",
    description: "Manage team members and roles",
    icon: Users,
    href: "/s/settings/team",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "Help & Support",
    description: "Get help and contact support",
    icon: HelpCircle,
    href: "/s/settings/help-support",
    color: "bg-purple-100 dark:bg-purple-900",
  },
]

const quickSettings = [
  {
    title: "Notifications",
    description: "Manage notification preferences",
    icon: Bell,
    enabled: true,
  },
  {
    title: "Privacy",
    description: "Privacy and security settings",
    icon: Shield,
    enabled: true,
  },
  {
    title: "Language",
    description: "Language and region settings",
    icon: Globe,
    enabled: false,
  },
  {
    title: "Theme",
    description: "Appearance and theme settings",
    icon: Palette,
    enabled: true,
  },
]

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Settings Categories */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Settings Categories</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {settingsCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.title} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-2`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Settings */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Settings</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {quickSettings.map((setting) => {
                const Icon = setting.icon
                return (
                  <div key={setting.title} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{setting.title}</div>
                        <div className="text-sm text-muted-foreground">{setting.description}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <div className="font-medium">xoraxi@iilm.com</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Student ID</div>
              <div className="font-medium">STU2024001</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Account Type</div>
              <div className="font-medium">Student</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Member Since</div>
              <div className="font-medium">September 2024</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
