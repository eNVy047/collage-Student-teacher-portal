"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Calendar, Clock, Upload, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Assignment {
  id: string
  title: string
  course: string
  courseCode: string
  dueDate: Date
  status: "pending" | "submitted" | "overdue" | "graded"
  points: number
  submittedDate?: Date
  grade?: number
  description: string
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Linear Algebra Problem Set 1",
    course: "Mathematical Methods",
    courseCode: "MTS 241",
    dueDate: new Date(2025, 5, 20),
    status: "pending",
    points: 100,
    description: "Complete exercises 1-10 from Chapter 3. Show all work and submit as PDF.",
  },
  {
    id: "2",
    title: "Data Structure Implementation",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    dueDate: new Date(2025, 5, 18),
    status: "submitted",
    points: 150,
    submittedDate: new Date(2025, 5, 17),
    description: "Implement a binary search tree with insert, delete, and search operations.",
  },
  {
    id: "3",
    title: "Neural Network Lab Report",
    course: "Neural Networks",
    courseCode: "CSC 231",
    dueDate: new Date(2025, 5, 15),
    status: "overdue",
    points: 200,
    description: "Write a lab report on your neural network experiments. Include graphs and analysis.",
  },
  {
    id: "4",
    title: "Statistical Analysis Project",
    course: "Applied Statistics",
    courseCode: "STA 201",
    dueDate: new Date(2025, 5, 25),
    status: "pending",
    points: 250,
    description: "Analyze a dataset of your choice using statistical methods learned in class.",
  },
  {
    id: "5",
    title: "Graph Algorithms Assignment",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    dueDate: new Date(2025, 5, 10),
    status: "graded",
    points: 100,
    submittedDate: new Date(2025, 5, 9),
    grade: 92,
    description: "Implement Dijkstra's algorithm and analyze its time complexity.",
  },
]

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statusConfig = {
    pending: {
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      icon: Clock,
      label: "Pending",
    },
    submitted: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      icon: Upload,
      label: "Submitted",
    },
    overdue: {
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      icon: XCircle,
      label: "Overdue",
    },
    graded: {
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      icon: CheckCircle,
      label: "Graded",
    },
  }

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date()
    const diff = dueDate.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">View and submit your course assignments</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assignments by title, course, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === "submitted" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("submitted")}
          >
            Submitted
          </Button>
          <Button
            variant={filterStatus === "overdue" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("overdue")}
          >
            Overdue
          </Button>
          <Button
            variant={filterStatus === "graded" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("graded")}
          >
            Graded
          </Button>
        </div>
      </div>

      {/* Assignments List */}
      {filteredAssignments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No assignments found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAssignments.map((assignment) => {
            const StatusIcon = statusConfig[assignment.status].icon
            const daysUntilDue = getDaysUntilDue(assignment.dueDate)
            return (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <Badge className={statusConfig[assignment.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[assignment.status].label}
                        </Badge>
                      </div>
                      <CardDescription className="mb-3">{assignment.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium">{assignment.courseCode} - {assignment.course}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                        </div>
                        <span>{assignment.points} points</span>
                        {assignment.status === "pending" && (
                          <span className={daysUntilDue <= 3 ? "text-red-600 font-medium" : ""}>
                            {daysUntilDue > 0 ? `${daysUntilDue} days left` : "Due today"}
                          </span>
                        )}
                        {assignment.status === "submitted" && assignment.submittedDate && (
                          <span>Submitted: {assignment.submittedDate.toLocaleDateString()}</span>
                        )}
                        {assignment.status === "graded" && assignment.grade !== undefined && (
                          <span className="font-semibold text-primary">Grade: {assignment.grade}/{assignment.points}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {assignment.status === "pending" && (
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      )}
                      {assignment.status === "graded" && (
                        <Button variant="outline">View Feedback</Button>
                      )}
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockAssignments.filter((a) => a.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockAssignments.filter((a) => a.status === "submitted").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockAssignments
                .filter((a) => a.grade !== undefined)
                .reduce((sum, a) => sum + (a.grade || 0), 0) /
                mockAssignments.filter((a) => a.grade !== undefined).length || 0}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
