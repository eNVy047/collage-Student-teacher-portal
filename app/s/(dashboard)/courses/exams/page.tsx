"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, MapPin, AlertCircle, CheckCircle, FileText } from "lucide-react"

interface Exam {
  id: string
  title: string
  course: string
  courseCode: string
  date: Date
  time: string
  duration: string
  venue: string
  type: "midterm" | "final" | "quiz" | "project"
  status: "upcoming" | "completed" | "cancelled"
  instructions?: string
}

const mockExams: Exam[] = [
  {
    id: "1",
    title: "Midterm Examination",
    course: "Mathematical Methods",
    courseCode: "MTS 241",
    date: new Date(2025, 6, 15),
    time: "10:00 AM",
    duration: "2 hours",
    venue: "Main Hall A",
    type: "midterm",
    status: "upcoming",
    instructions: "Bring calculator and student ID. Closed book exam.",
  },
  {
    id: "2",
    title: "Final Examination",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    date: new Date(2025, 7, 20),
    time: "2:00 PM",
    duration: "3 hours",
    venue: "Computer Lab 2",
    type: "final",
    status: "upcoming",
    instructions: "Laptop required. Internet access will be restricted.",
  },
  {
    id: "3",
    title: "Quiz 3",
    course: "Neural Networks",
    courseCode: "CSC 231",
    date: new Date(2025, 5, 25),
    time: "11:00 AM",
    duration: "30 minutes",
    venue: "Classroom 301",
    type: "quiz",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Final Project Presentation",
    course: "Applied Statistics",
    courseCode: "STA 201",
    date: new Date(2025, 6, 5),
    time: "9:00 AM",
    duration: "15 minutes",
    venue: "Conference Room B",
    type: "project",
    status: "upcoming",
    instructions: "Prepare a 10-minute presentation. Bring your laptop and backup slides.",
  },
  {
    id: "5",
    title: "Midterm Examination",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    date: new Date(2025, 5, 10),
    time: "10:00 AM",
    duration: "2 hours",
    venue: "Main Hall A",
    type: "midterm",
    status: "completed",
  },
]

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterType, setFilterType] = React.useState<string>("all")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || exam.type === filterType
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const typeColors = {
    midterm: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    final: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    quiz: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    project: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  const statusColors = {
    upcoming: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  const getDaysUntilExam = (examDate: Date) => {
    const now = new Date()
    const diff = examDate.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  const upcomingExams = mockExams
    .filter((exam) => exam.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Exams</h1>
          <p className="text-muted-foreground">View exam schedules, venues, and instructions</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search exams by title, course, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All Types
          </Button>
          <Button
            variant={filterType === "midterm" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("midterm")}
          >
            Midterms
          </Button>
          <Button
            variant={filterType === "final" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("final")}
          >
            Finals
          </Button>
          <Button
            variant={filterType === "quiz" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("quiz")}
          >
            Quizzes
          </Button>
          <Button
            variant={filterType === "project" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("project")}
          >
            Projects
          </Button>
          <div className="ml-auto flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All Status
            </Button>
            <Button
              variant={filterStatus === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("upcoming")}
            >
              Upcoming
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("completed")}
            >
              Completed
            </Button>
          </div>
        </div>
      </div>

      {/* Upcoming Exams Alert */}
      {upcomingExams.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Upcoming Exams</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingExams.slice(0, 3).map((exam) => {
                const daysUntil = getDaysUntilExam(exam.date)
                return (
                  <div key={exam.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{exam.title}</span> - {exam.courseCode}
                    </div>
                    <div className="flex items-center gap-4">
                      <span>{exam.date.toLocaleDateString()}</span>
                      <Badge variant="outline" className={daysUntil <= 7 ? "border-orange-600 text-orange-600" : ""}>
                        {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exams List */}
      {filteredExams.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No exams found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredExams.map((exam) => {
            const daysUntil = getDaysUntilExam(exam.date)
            return (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        <Badge className={typeColors[exam.type]}>
                          {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                        </Badge>
                        <Badge className={statusColors[exam.status]}>
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="mb-3">{exam.courseCode} - {exam.course}</CardDescription>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.time} ({exam.duration})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.venue}</span>
                        </div>
                        {exam.status === "upcoming" && (
                          <div className="flex items-center gap-2 text-sm font-medium">
                            {daysUntil === 0 ? (
                              <span className="text-red-600">Today</span>
                            ) : daysUntil === 1 ? (
                              <span className="text-orange-600">Tomorrow</span>
                            ) : daysUntil <= 7 ? (
                              <span className="text-orange-600">{daysUntil} days left</span>
                            ) : (
                              <span className="text-muted-foreground">{daysUntil} days left</span>
                            )}
                          </div>
                        )}
                      </div>
                      {exam.instructions && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium mb-1">Instructions:</div>
                          <div className="text-sm text-muted-foreground">{exam.instructions}</div>
                        </div>
                      )}
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
            <CardDescription>Total Exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockExams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockExams.filter((e) => e.status === "upcoming").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockExams.filter((e) => e.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Exam</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingExams.length > 0 ? (
              <div className="text-sm">
                <div className="font-medium">{upcomingExams[0].courseCode}</div>
                <div className="text-muted-foreground">
                  {getDaysUntilExam(upcomingExams[0].date)} days
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No upcoming exams</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
