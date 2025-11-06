"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

interface Limit {
  id: string
  name: string
  limit: number
  used: number
  type: "credit" | "transaction" | "daily"
  status: "active" | "warning" | "exceeded"
}

const mockLimits: Limit[] = [
  {
    id: "1",
    name: "Monthly Credit Limit",
    limit: 100000,
    used: 75000,
    type: "credit",
    status: "active",
  },
  {
    id: "2",
    name: "Daily Transaction Limit",
    limit: 50000,
    used: 25000,
    type: "transaction",
    status: "active",
  },
  {
    id: "3",
    name: "Single Transaction Limit",
    limit: 25000,
    used: 0,
    type: "transaction",
    status: "active",
  },
  {
    id: "4",
    name: "Monthly Spending Limit",
    limit: 80000,
    used: 78000,
    type: "credit",
    status: "warning",
  },
]

export default function LimitsPage() {
  const getPercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100)
  }

  const getStatusColor = (status: string, percentage: number) => {
    if (status === "exceeded" || percentage >= 100) return "bg-red-600"
    if (status === "warning" || percentage >= 80) return "bg-orange-600"
    return "bg-green-600"
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Financial Limits</h1>
        <p className="text-muted-foreground">View and manage your financial limits and restrictions</p>
      </div>

      {/* Limits Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockLimits.map((limit) => {
          const percentage = getPercentage(limit.used, limit.limit)
          const remaining = limit.limit - limit.used
          return (
            <Card key={limit.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{limit.name}</CardTitle>
                  <Badge
                    variant={
                      limit.status === "exceeded" || percentage >= 100
                        ? "destructive"
                        : limit.status === "warning" || percentage >= 80
                        ? "default"
                        : "outline"
                    }
                  >
                    {limit.status === "exceeded" || percentage >= 100
                      ? "Exceeded"
                      : limit.status === "warning" || percentage >= 80
                      ? "Warning"
                      : "Active"}
                  </Badge>
                </div>
                <CardDescription>
                  {limit.type === "credit"
                    ? "Credit limit"
                    : limit.type === "transaction"
                    ? "Transaction limit"
                    : "Daily limit"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Used</span>
                    <span className="font-semibold">
                      ₹{limit.used.toLocaleString()} / ₹{limit.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${getStatusColor(limit.status, percentage)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted-foreground">{percentage.toFixed(1)}% used</span>
                    <span className="font-medium">
                      ₹{remaining >= 0 ? remaining.toLocaleString() : 0} remaining
                    </span>
                  </div>
                </div>

                {limit.status === "warning" || percentage >= 80 ? (
                  <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 rounded-md">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      You're approaching your limit. Consider monitoring your spending.
                    </div>
                  </div>
                ) : limit.status === "exceeded" || percentage >= 100 ? (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div className="text-sm text-red-700 dark:text-red-300">
                      Limit exceeded. Please contact finance office for assistance.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Within limit</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Limit Summary</CardTitle>
          <CardDescription>Overview of your financial limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Credit Limit</div>
              <div className="text-2xl font-bold">
                ₹{mockLimits.filter((l) => l.type === "credit").reduce((sum, l) => sum + l.limit, 0).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Used</div>
              <div className="text-2xl font-bold text-orange-600">
                ₹{mockLimits.filter((l) => l.type === "credit").reduce((sum, l) => sum + l.used, 0).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Available Credit</div>
              <div className="text-2xl font-bold text-green-600">
                ₹{mockLimits
                  .filter((l) => l.type === "credit")
                  .reduce((sum, l) => sum + (l.limit - l.used), 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>About Financial Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Financial limits help you manage your spending and prevent unauthorized transactions. These limits are set
              based on your account type and can be adjusted by contacting the finance office.
            </p>
            <p>
              If you need to increase your limits or have questions about your current limits, please reach out to the
              finance department.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
