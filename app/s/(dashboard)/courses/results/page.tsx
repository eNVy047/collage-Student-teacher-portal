"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Award, TrendingUp, BookOpen, FileText, Download } from "lucide-react"

interface Grade {
  id: string
  course: string
  courseCode: string
  credits: number
  assignments: number
  midterm: number
  final: number
  project?: number
  total: number
  grade: string
  gpa: number
  semester: string
}

const mockGrades: Grade[] = [
  {
    id: "1",
    course: "Mathematical Methods",
    courseCode: "MTS 241",
    credits: 4,
    assignments: 85,
    midterm: 88,
    final: 90,
    total: 88.5,
    grade: "A",
    gpa: 4.0,
    semester: "Fall 2024",
  },
  {
    id: "2",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    credits: 3,
    assignments: 92,
    midterm: 85,
    final: 87,
    project: 90,
    total: 88.5,
    grade: "A",
    gpa: 4.0,
    semester: "Fall 2024",
  },
  {
    id: "3",
    course: "Neural Networks",
    courseCode: "CSC 231",
    credits: 3,
    assignments: 78,
    midterm: 82,
    final: 80,
    total: 80.0,
    grade: "B",
    gpa: 3.0,
    semester: "Fall 2024",
  },
  {
    id: "4",
    course: "Applied Statistics",
    courseCode: "STA 201",
    credits: 3,
    assignments: 88,
    midterm: 85,
    final: 87,
    total: 86.7,
    grade: "A-",
    gpa: 3.7,
    semester: "Fall 2024",
  },
]

const gradeColors: Record<string, string> = {
  "A": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "A-": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "B+": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "B": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "B-": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "C+": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "C": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "C-": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "D": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "F": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export default function ResultsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSemester, setSelectedSemester] = React.useState<string>("all")

  const filteredGrades = mockGrades.filter((grade) => {
    const matchesSearch =
      grade.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSemester = selectedSemester === "all" || grade.semester === selectedSemester
    return matchesSearch && matchesSemester
  })

  const totalCredits = mockGrades.reduce((sum, grade) => sum + grade.credits, 0)
  const totalQualityPoints = mockGrades.reduce((sum, grade) => sum + grade.credits * grade.gpa, 0)
  const overallGPA = totalQualityPoints / totalCredits

  const uniqueSemesters = Array.from(new Set(mockGrades.map((grade) => grade.semester)))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Results & Grades</h1>
          <p className="text-muted-foreground">View your academic performance and grades</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Transcript
        </Button>
      </div>

      {/* Overall GPA Card */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardDescription>Overall GPA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">{overallGPA.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalCredits} credits completed
                </p>
              </div>
              <Award className="h-12 w-12 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Courses Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGrades.length}</div>
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
            variant={selectedSemester === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSemester("all")}
          >
            All Semesters
          </Button>
          {uniqueSemesters.map((semester) => (
            <Button
              key={semester}
              variant={selectedSemester === semester ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSemester(semester)}
            >
              {semester}
            </Button>
          ))}
        </div>
      </div>

      {/* Grades List */}
      {filteredGrades.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No grades found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredGrades.map((grade) => (
            <Card key={grade.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{grade.course}</CardTitle>
                      <Badge variant="outline">{grade.courseCode}</Badge>
                      <Badge className={gradeColors[grade.grade] || "bg-gray-100 text-gray-800"}>
                        {grade.grade}
                      </Badge>
                      <Badge variant="secondary">{grade.semester}</Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mt-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Assignments</div>
                        <div className="text-xl font-semibold">{grade.assignments}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Midterm</div>
                        <div className="text-xl font-semibold">{grade.midterm}%</div>
                      </div>
                      {grade.project !== undefined && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Project</div>
                          <div className="text-xl font-semibold">{grade.project}%</div>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Final</div>
                        <div className="text-xl font-semibold">{grade.final}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total</div>
                        <div className="text-2xl font-bold text-primary">{grade.total.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          GPA: {grade.gpa.toFixed(1)} • {grade.credits} credits
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Download Grade Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Grade Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
          <CardDescription>Overview of your grades across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {["A", "B", "C", "D", "F"].map((letterGrade) => {
              const count = mockGrades.filter((g) => g.grade.startsWith(letterGrade)).length
              const percentage = (count / mockGrades.length) * 100
              return (
                <div key={letterGrade} className="text-center">
                  <div className={`text-2xl font-bold mb-1 ${gradeColors[letterGrade] ? "" : "text-muted-foreground"}`}>
                    {letterGrade}
                  </div>
                  <div className="text-3xl font-bold mb-2">{count}</div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        letterGrade === "A"
                          ? "bg-green-600"
                          : letterGrade === "B"
                          ? "bg-blue-600"
                          : letterGrade === "C"
                          ? "bg-yellow-600"
                          : letterGrade === "D"
                          ? "bg-orange-600"
                          : "bg-red-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{percentage.toFixed(0)}%</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
