"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, AlertCircle, Calendar, TrendingUp, BookOpen } from "lucide-react"

interface AttendanceRecord {
  id: string
  course: string
  courseCode: string
  totalClasses: number
  attended: number
  absent: number
  percentage: number
  status: "good" | "warning" | "critical"
  lastUpdated: Date
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    course: "Mathematical Methods",
    courseCode: "MTS 241",
    totalClasses: 30,
    attended: 28,
    absent: 2,
    percentage: 93.3,
    status: "good",
    lastUpdated: new Date(2025, 5, 15),
  },
  {
    id: "2",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    totalClasses: 28,
    attended: 25,
    absent: 3,
    percentage: 89.3,
    status: "good",
    lastUpdated: new Date(2025, 5, 15),
  },
  {
    id: "3",
    course: "Neural Networks",
    courseCode: "CSC 231",
    totalClasses: 25,
    attended: 18,
    absent: 7,
    percentage: 72.0,
    status: "warning",
    lastUpdated: new Date(2025, 5, 15),
  },
  {
    id: "4",
    course: "Applied Statistics",
    courseCode: "STA 201",
    totalClasses: 30,
    attended: 21,
    absent: 9,
    percentage: 70.0,
    status: "warning",
    lastUpdated: new Date(2025, 5, 15),
  },
]

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredAttendance = mockAttendance.filter((record) => {
    const matchesSearch =
      record.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statusConfig = {
    good: {
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      icon: CheckCircle,
      label: "Good",
      threshold: 85,
    },
    warning: {
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      icon: AlertCircle,
      label: "Warning",
      threshold: 75,
    },
    critical: {
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      icon: XCircle,
      label: "Critical",
      threshold: 0,
    },
  }

  const overallPercentage =
    mockAttendance.reduce((sum, record) => sum + record.percentage, 0) / mockAttendance.length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track your class attendance across all courses</p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overall Attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{overallPercentage.toFixed(1)}%</div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full transition-all"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {mockAttendance.reduce((sum, record) => sum + record.totalClasses, 0)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Across {mockAttendance.length} courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Classes Attended</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {mockAttendance.reduce((sum, record) => sum + record.attended, 0)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {mockAttendance.reduce((sum, record) => sum + record.absent, 0)} absent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by course name or code..."
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
            variant={filterStatus === "good" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("good")}
          >
            Good (&gt;85%)
          </Button>
          <Button
            variant={filterStatus === "warning" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("warning")}
          >
            Warning (75-85%)
          </Button>
          <Button
            variant={filterStatus === "critical" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("critical")}
          >
            Critical (&lt;75%)
          </Button>
        </div>
      </div>

      {/* Attendance Records */}
      {filteredAttendance.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No attendance records found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAttendance.map((record) => {
            const StatusIcon = statusConfig[record.status].icon
            return (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{record.course}</CardTitle>
                        <Badge variant="outline">{record.courseCode}</Badge>
                        <Badge className={statusConfig[record.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[record.status].label}
                        </Badge>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Attendance</div>
                          <div className="text-2xl font-bold">{record.percentage.toFixed(1)}%</div>
                          <div className="mt-2 w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                record.status === "good"
                                  ? "bg-green-600"
                                  : record.status === "warning"
                                  ? "bg-orange-600"
                                  : "bg-red-600"
                              }`}
                              style={{ width: `${record.percentage}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Attended</div>
                          <div className="text-xl font-semibold text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            {record.attended}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            out of {record.totalClasses} classes
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Absent</div>
                          <div className="text-xl font-semibold text-red-600 flex items-center gap-1">
                            <XCircle className="h-4 w-4" />
                            {record.absent}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {((record.absent / record.totalClasses) * 100).toFixed(1)}% of classes
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                          <div className="text-sm font-medium">
                            {record.lastUpdated.toLocaleDateString()}
                          </div>
                          {record.percentage < 75 && (
                            <div className="mt-2 text-xs text-orange-600 font-medium">
                              Below minimum requirement
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      )}

      {/* Warning for Low Attendance */}
      {mockAttendance.some((record) => record.status === "warning" || record.status === "critical") && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Attendance Warning</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have courses with attendance below 75%. Please ensure you attend classes regularly to
              meet the minimum attendance requirement. Contact your course instructors if you have any
              concerns.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
