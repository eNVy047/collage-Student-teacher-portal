"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Calendar, Clock, MapPin, Users, UserPlus, Download } from "lucide-react"

interface Workshop {
  id: string
  title: string
  instructor: string
  date: Date
  time: string
  duration: string
  venue: string
  description: string
  capacity: number
  enrolled: number
  status: "upcoming" | "ongoing" | "completed" | "full"
  materials?: string
}

const mockWorkshops: Workshop[] = [
  {
    id: "1",
    title: "Machine Learning Workshop",
    instructor: "Dr. Sarah Chen",
    date: new Date(2025, 5, 22),
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    venue: "Computer Lab 3",
    description: "Learn the fundamentals of machine learning with hands-on projects and real-world applications. Topics include supervised learning, neural networks, and model evaluation.",
    capacity: 30,
    enrolled: 25,
    status: "upcoming",
    materials: "workshop_ml_2025.pdf",
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    instructor: "Prof. Michael Johnson",
    date: new Date(2025, 5, 28),
    time: "9:00 AM - 5:00 PM",
    duration: "Full Day",
    venue: "Computer Lab 1",
    description: "Intensive bootcamp covering modern web development technologies including React, Next.js, and TypeScript. Bring your laptop.",
    capacity: 40,
    enrolled: 40,
    status: "full",
    materials: "workshop_webdev_2025.pdf",
  },
  {
    id: "3",
    title: "Data Science with Python",
    instructor: "Dr. Lisa Wang",
    date: new Date(2025, 6, 5),
    time: "10:00 AM - 1:00 PM",
    duration: "3 hours",
    venue: "Computer Lab 2",
    description: "Introduction to data science using Python. Learn pandas, numpy, and matplotlib for data analysis and visualization.",
    capacity: 25,
    enrolled: 18,
    status: "upcoming",
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    instructor: "Ms. Emily Davis",
    date: new Date(2025, 5, 15),
    time: "1:00 PM - 4:00 PM",
    duration: "3 hours",
    venue: "Design Studio",
    description: "Master the fundamentals of user interface and user experience design. Learn about design thinking, wireframing, and prototyping.",
    capacity: 20,
    enrolled: 20,
    status: "completed",
  },
]

export default function WorkshopsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredWorkshops = mockWorkshops.filter((workshop) => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || workshop.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    upcoming: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    ongoing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    full: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  }

  const getDaysUntil = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workshops</h1>
          <p className="text-muted-foreground">Register for workshops and enhance your skills</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search workshops..."
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
            variant={filterStatus === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant={filterStatus === "full" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("full")}
          >
            Full
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

      {/* Workshops Grid */}
      {filteredWorkshops.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No workshops found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredWorkshops.map((workshop) => {
            const daysUntil = getDaysUntil(workshop.date)
            const isEnrolled = workshop.status === "upcoming" || workshop.status === "ongoing"
            return (
              <Card key={workshop.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={statusColors[workshop.status]}>
                      {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {workshop.enrolled}/{workshop.capacity} enrolled
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{workshop.title}</CardTitle>
                  <CardDescription className="text-base font-medium">{workshop.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-4">
                    <CardDescription>{workshop.description}</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{workshop.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.time} ({workshop.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{workshop.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{workshop.enrolled} students enrolled</span>
                    </div>
                    {workshop.status === "upcoming" && (
                      <div className="text-sm font-medium text-orange-600">
                        {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days remaining`}
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(workshop.enrolled / workshop.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    {workshop.status === "upcoming" && workshop.enrolled < workshop.capacity && (
                      <Button className="flex-1">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    )}
                    {workshop.status === "full" && (
                      <Button variant="outline" className="flex-1" disabled>
                        Full
                      </Button>
                    )}
                    {workshop.materials && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Materials
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Workshops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockWorkshops.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockWorkshops.filter((w) => w.status === "upcoming").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enrolled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockWorkshops.filter((w) => w.status === "upcoming" || w.status === "ongoing").reduce((sum, w) => sum + w.enrolled, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {mockWorkshops.filter((w) => w.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
