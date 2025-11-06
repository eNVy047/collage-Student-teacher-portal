"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Download, Receipt, Calendar, DollarSign, AlertCircle } from "lucide-react"

interface Bill {
  id: string
  description: string
  amount: number
  dueDate: Date
  status: "paid" | "pending" | "overdue"
  issueDate: Date
  type: "tuition" | "hostel" | "library" | "other"
}

const mockBills: Bill[] = [
  {
    id: "1",
    description: "Tuition Fee - Fall 2024",
    amount: 50000,
    dueDate: new Date(2025, 4, 15),
    status: "paid",
    issueDate: new Date(2025, 3, 1),
    type: "tuition",
  },
  {
    id: "2",
    description: "Hostel Fee - Semester 1",
    amount: 30000,
    dueDate: new Date(2025, 5, 20),
    status: "pending",
    issueDate: new Date(2025, 4, 15),
    type: "hostel",
  },
  {
    id: "3",
    description: "Library Fine",
    amount: 500,
    dueDate: new Date(2025, 4, 30),
    status: "overdue",
    issueDate: new Date(2025, 4, 1),
    type: "library",
  },
  {
    id: "4",
    description: "Lab Fee - Computer Science",
    amount: 5000,
    dueDate: new Date(2025, 6, 10),
    status: "pending",
    issueDate: new Date(2025, 5, 1),
    type: "other",
  },
  {
    id: "5",
    description: "Tuition Fee - Spring 2024",
    amount: 50000,
    dueDate: new Date(2025, 0, 15),
    status: "paid",
    issueDate: new Date(2024, 11, 1),
    type: "tuition",
  },
]

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredBills = mockBills.filter((bill) => {
    const matchesSearch = bill.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || bill.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    pending: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  const totalDue = mockBills
    .filter((b) => b.status === "pending" || b.status === "overdue")
    .reduce((sum, b) => sum + b.amount, 0)

  const totalPaid = mockBills
    .filter((b) => b.status === "paid")
    .reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-muted-foreground">View and manage your bills and invoices</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Due</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalDue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockBills.filter((b) => b.status === "pending" || b.status === "overdue").length} bills
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Paid</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockBills.filter((b) => b.status === "paid").length} bills
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overdue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₹{mockBills.filter((b) => b.status === "overdue").reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockBills.filter((b) => b.status === "overdue").length} bills
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search bills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "paid" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("paid")}
          >
            Paid
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === "overdue" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("overdue")}
          >
            Overdue
          </Button>
        </div>
      </div>

      {/* Bills List */}
      {filteredBills.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Receipt className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No bills found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBills.map((bill) => (
            <Card key={bill.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Receipt className="h-5 w-5 text-muted-foreground" />
                      <div className="font-semibold text-lg">{bill.description}</div>
                      <Badge className={statusColors[bill.status]}>
                        {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Amount</div>
                        <div className="text-xl font-bold">₹{bill.amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Due Date</div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{bill.dueDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Issue Date</div>
                        <div className="font-medium">{bill.issueDate.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {(bill.status === "pending" || bill.status === "overdue") && (
                      <Button>
                        <DollarSign className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Alert for Overdue Bills */}
      {mockBills.some((b) => b.status === "overdue") && (
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Overdue Bills
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">
                  You have overdue bills that need immediate attention. Please pay them to avoid any penalties or restrictions.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
