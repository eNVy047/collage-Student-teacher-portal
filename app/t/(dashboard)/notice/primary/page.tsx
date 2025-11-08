"use client"

import * as React from "react"
import data from "../data.json"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function PrimaryNoticesPage() {
  const items = (data as { primary?: { title: string }[] }).primary ?? []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Primary Notices</h1>
        <p className="text-muted-foreground">General updates</p>
      </div>
      <div className="space-y-3">
        {items.map((n, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">{n.title}</CardTitle>
              <CardDescription>General notice</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}