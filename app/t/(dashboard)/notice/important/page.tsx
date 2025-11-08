"use client"

import * as React from "react"
import data from "../data.json"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ImportantNoticesPage() {
  const items = (data as { important?: { title: string }[] }).important ?? []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Important Notices</h1>
        <p className="text-muted-foreground">Must-read updates</p>
      </div>
      <div className="space-y-3">
        {items.map((n, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">{n.title}</CardTitle>
              <CardDescription>Priority notice</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}