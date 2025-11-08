"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import data from "../data.json"

export default function AnnouncementsPage() {
  const announcements = (data as { announcements?: { title: string; date: string }[] }).announcements ?? []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">Recent updates for teachers</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map((a, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{a.title}</CardTitle>
                <Badge variant="outline">{new Date(a.date).toLocaleDateString()}</Badge>
              </div>
              <CardDescription>Staff communication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Please review and take necessary actions.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}