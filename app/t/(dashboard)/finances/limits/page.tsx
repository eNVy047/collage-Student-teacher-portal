"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LimitsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Limits</h1>
        <p className="text-muted-foreground">Finance limits and thresholds</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Limit</CardTitle>
            <CardDescription>Configured by finance department</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Badge variant="secondary">₹100,000</Badge>
            <Badge variant="outline">Remaining: ₹25,000</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reimbursement Cap</CardTitle>
            <CardDescription>Per claim maximum</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">₹15,000</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}