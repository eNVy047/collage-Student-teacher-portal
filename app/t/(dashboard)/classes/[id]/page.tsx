"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export default function ClassSchedulerPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const schedules: Record<string, { time: string; title: string }[]> = {
    // keyed by YYYY-MM-DD
    [new Date().toISOString().slice(0, 10)]: [
      { time: "09:00", title: "Mathematics - Class 10A" },
      { time: "11:00", title: "Algorithms - Class 12 Science" },
    ],
  }

  const key = date ? date.toISOString().slice(0, 10) : ""
  const items = schedules[key] ?? []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Class Scheduler</h1>
        <p className="text-muted-foreground">Pick a date to view classes</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Navigate calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>
              {date ? new Date(date).toLocaleDateString() : "No date"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.length === 0 ? (
              <p className="text-muted-foreground">No classes scheduled.</p>
            ) : (
              items.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{s.title}</span>
                  <Badge variant="outline">{s.time}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}