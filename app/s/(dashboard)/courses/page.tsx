"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Clock, Users, ArrowRight, Filter } from "lucide-react"

interface Course {
  id: string
  code: string
  name: string
  instructor: string
  schedule: string
  credits: number
  enrolled: number
  status: "active" | "completed" | "upcoming"
  progress: number
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "MTS 241",
    name: "Mathematical Methods",
    instructor: "Dr. John Simon",
    schedule: "Mon, Wed - 8:00 AM - 10:00 AM",
    credits: 4,
    enrolled: 45,
    status: "active",
    progress: 65,
  },
  {
    id: "2",
    code: "CSC 261",
    name: "Algorithms & Data Structures",
    instructor: "Dr. Cynthia A.",
    schedule: "Tue, Thu - 11:00 AM - 12:00 PM",
    credits: 3,
    enrolled: 52,
    status: "active",
    progress: 45,
  },
  {
    id: "3",
    code: "CSC 231",
    name: "Neural Networks",
    instructor: "Dr. Cynthia A.",
    schedule: "Mon, Wed - 2:00 PM - 3:00 PM",
    credits: 3,
    enrolled: 38,
    status: "active",
    progress: 30,
  },
  {
    id: "4",
    code: "STA 201",
    name: "Applied Statistics",
    instructor: "Dr. Cynthia A.",
    schedule: "Tue, Thu - 11:00 AM - 12:00 PM",
    credits: 3,
    enrolled: 42,
    status: "active",
    progress: 55,
  },
  {
    id: "5",
    code: "CSC 301",
    name: "Database Systems",
    instructor: "Dr. Michael Chen",
    schedule: "Mon, Wed, Fri - 10:00 AM - 11:00 AM",
    credits: 4,
    enrolled: 48,
    status: "upcoming",
    progress: 0,
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    upcoming: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">View and manage all your enrolled courses</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses by name, code, or instructor..."
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
            variant={filterStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("active")}
          >
            Active
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

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={statusColors[course.status]}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </Badge>
                  <Badge variant="outline">{course.code}</Badge>
                </div>
                <CardTitle className="text-xl mb-2">{course.name}</CardTitle>
                <CardDescription className="text-base font-medium">{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.enrolled} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.credits} Credits</span>
                  </div>
                </div>

                {course.status === "active" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button className="w-full mt-auto" variant={course.status === "active" ? "default" : "outline"}>
                  View Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCourses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCourses.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCourses.reduce((sum, c) => sum + c.credits, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockCourses
                  .filter((c) => c.status === "active")
                  .reduce((sum, c) => sum + c.progress, 0) /
                  mockCourses.filter((c) => c.status === "active").length || 0
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
