"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, AlertCircle } from "lucide-react"

export default function FinancesPage() {
  const totalBalance = 50000
  const totalPaid = 150000
  const totalDue = 25000
  const upcomingPayments = 15000

  const recentTransactions = [
    {
      id: "1",
      description: "Tuition Fee - Fall 2024",
      amount: 50000,
      date: new Date(2025, 4, 15),
      type: "payment",
      status: "completed",
    },
    {
      id: "2",
      description: "Library Fine",
      amount: 500,
      date: new Date(2025, 5, 1),
      type: "payment",
      status: "completed",
    },
    {
      id: "3",
      description: "Hostel Fee",
      amount: 30000,
      date: new Date(2025, 5, 10),
      type: "payment",
      status: "pending",
    },
    {
      id: "4",
      description: "Scholarship Credit",
      amount: 10000,
      date: new Date(2025, 4, 20),
      type: "credit",
      status: "completed",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finances</h1>
          <p className="text-muted-foreground">Manage your financial information and payments</p>
        </div>
        <Button>
          <Receipt className="h-4 w-4 mr-2" />
          Download Statement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Account Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Available credit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Paid</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Due</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalDue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Outstanding payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{upcomingPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Due this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${transaction.type === "credit" ? "bg-green-100 dark:bg-green-900" : "bg-blue-100 dark:bg-blue-900"}`}>
                    {transaction.type === "credit" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-lg font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "credit" ? "+" : "-"}₹{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <Badge variant={transaction.status === "completed" ? "default" : "outline"}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Credit Card</div>
                  <div className="text-sm text-muted-foreground">**** **** **** 1234</div>
                </div>
              </div>
              <Badge variant="outline">Default</Badge>
            </div>
            <Button variant="outline" className="w-full">Add Payment Method</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Alerts</CardTitle>
            <CardDescription>Stay informed about your payments</CardDescription>
          </CardHeader>
          <CardContent>
            {totalDue > 0 && (
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 rounded-md">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-orange-900 dark:text-orange-100">
                    Outstanding Balance
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    You have ₹{totalDue.toLocaleString()} in outstanding payments. Please clear your dues to avoid any issues.
                  </div>
                  <Button size="sm" className="mt-3">Pay Now</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
