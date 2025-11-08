"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import data from "./data.json"
import { Badge } from "@/components/ui/badge"

export default function TeacherCoursesPage() {
  const courses = (data as { courses: { name: string; code?: string; slug?: string }[] }).courses || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Your teaching courses</p>
        </div>
        <Badge variant="secondary" className="hidden md:inline">{courses.length} total</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.slug || c.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{c.name}</CardTitle>
                {c.code && <Badge variant="outline">{c.code}</Badge>}
              </div>
              <CardDescription>Course resources and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{c.slug || "course"}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


