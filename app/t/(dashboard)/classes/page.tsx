"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import data from "./data.json"
import { Badge } from "@/components/ui/badge"

export default function ClassesPage() {
  const classes = (data as { classes: { name: string; slug?: string }[] }).classes || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Classes</h1>
          <p className="text-muted-foreground">Your assigned classes</p>
        </div>
        <Badge variant="secondary" className="hidden md:inline">{classes.length} total</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {classes.map((c) => (
          <Card key={c.slug || c.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
              <CardDescription>Classroom management and schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{c.slug || "class"}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


