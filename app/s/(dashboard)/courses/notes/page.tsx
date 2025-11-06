"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Download, Calendar, Filter, BookOpen } from "lucide-react"

interface Note {
  id: string
  title: string
  course: string
  courseCode: string
  uploadDate: Date
  fileSize: string
  type: "lecture" | "tutorial" | "handout" | "assignment"
  downloadUrl: string
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Introduction to Linear Algebra",
    course: "Mathematical Methods",
    courseCode: "MTS 241",
    uploadDate: new Date(2025, 5, 10),
    fileSize: "2.4 MB",
    type: "lecture",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Data Structures Overview",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    uploadDate: new Date(2025, 5, 12),
    fileSize: "1.8 MB",
    type: "lecture",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Neural Networks Basics - Tutorial",
    course: "Neural Networks",
    courseCode: "CSC 231",
    uploadDate: new Date(2025, 5, 11),
    fileSize: "3.2 MB",
    type: "tutorial",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Statistical Methods Reference",
    course: "Applied Statistics",
    courseCode: "STA 201",
    uploadDate: new Date(2025, 5, 9),
    fileSize: "1.5 MB",
    type: "handout",
    downloadUrl: "#",
  },
  {
    id: "5",
    title: "Assignment 1 Guidelines",
    course: "Mathematical Methods",
    courseCode: "MTS 241",
    uploadDate: new Date(2025, 5, 8),
    fileSize: "856 KB",
    type: "assignment",
    downloadUrl: "#",
  },
  {
    id: "6",
    title: "Graph Algorithms - Lecture Notes",
    course: "Algorithms & Data Structures",
    courseCode: "CSC 261",
    uploadDate: new Date(2025, 5, 13),
    fileSize: "2.1 MB",
    type: "lecture",
    downloadUrl: "#",
  },
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterType, setFilterType] = React.useState<string>("all")
  const [filterCourse, setFilterCourse] = React.useState<string>("all")

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || note.type === filterType
    const matchesCourse = filterCourse === "all" || note.courseCode === filterCourse
    return matchesSearch && matchesType && matchesCourse
  })

  const typeColors = {
    lecture: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    tutorial: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    handout: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    assignment: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  }

  const uniqueCourses = Array.from(new Set(mockNotes.map((note) => note.courseCode)))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Course Notes</h1>
          <p className="text-muted-foreground">Access and download lecture notes, tutorials, and handouts</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes by title, course, or code..."
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
            variant={filterType === "lecture" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("lecture")}
          >
            Lectures
          </Button>
          <Button
            variant={filterType === "tutorial" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("tutorial")}
          >
            Tutorials
          </Button>
          <Button
            variant={filterType === "handout" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("handout")}
          >
            Handouts
          </Button>
          <Button
            variant={filterType === "assignment" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("assignment")}
          >
            Assignments
          </Button>
          <div className="ml-auto flex gap-2">
            {uniqueCourses.map((courseCode) => (
              <Button
                key={courseCode}
                variant={filterCourse === courseCode ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCourse(courseCode)}
              >
                {courseCode}
              </Button>
            ))}
            <Button
              variant={filterCourse === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCourse("all")}
            >
              All Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No notes found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      <Badge className={typeColors[note.type]}>
                        {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{note.courseCode} - {note.course}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{note.uploadDate.toLocaleDateString()}</span>
                      </div>
                      <span>{note.fileSize}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNotes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lecture Notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNotes.filter((n) => n.type === "lecture").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tutorials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNotes.filter((n) => n.type === "tutorial").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Handouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNotes.filter((n) => n.type === "handout").length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
