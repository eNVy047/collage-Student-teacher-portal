"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import classesData from "@/app/t/(dashboard)/classes/data.json"

export default function TeacherDashboardPage() {
  const classes = (classesData as { classes?: { name: string; slug?: string }[] }).classes ?? []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Upcoming Classes</h1>
        <p className="text-muted-foreground">Your next scheduled classes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {classes.slice(0, 3).map((c) => (
          <Card key={c.slug || c.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
              <CardDescription>Classroom session</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="outline">{c.slug || "class"}</Badge>
              <Button asChild size="sm" variant="secondary">
                <a href="/t/classes/schedular">View schedule</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
            <CardDescription>Assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">{classes.length}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>Active teaching courses</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">3</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="sm">
              <a href="/t/dashboard/announcements">View</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}