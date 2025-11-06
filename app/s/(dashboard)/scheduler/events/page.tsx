"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, PartyPopper, Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  venue: string
  type: "academic" | "cultural" | "sports" | "social"
  attendees: number
  capacity?: number
  status: "upcoming" | "ongoing" | "completed"
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Science Fair",
    description: "Join us for the annual science fair showcasing innovative projects from students across all departments.",
    date: new Date(2025, 5, 20),
    time: "10:00 AM - 4:00 PM",
    venue: "Main Auditorium",
    type: "academic",
    attendees: 150,
    capacity: 200,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Career Fair 2025",
    description: "Meet top employers and explore career opportunities. Bring your resume!",
    date: new Date(2025, 5, 25),
    time: "9:00 AM - 3:00 PM",
    venue: "Sports Complex",
    type: "academic",
    attendees: 200,
    capacity: 300,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Cultural Fest",
    description: "Annual cultural festival featuring music, dance, and food from different regions.",
    date: new Date(2025, 6, 10),
    time: "2:00 PM - 8:00 PM",
    venue: "Open Ground",
    type: "cultural",
    attendees: 500,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Inter-College Sports Tournament",
    description: "Annual sports tournament featuring football, basketball, and cricket competitions.",
    date: new Date(2025, 6, 15),
    time: "All Day",
    venue: "Sports Complex",
    type: "sports",
    attendees: 300,
    status: "upcoming",
  },
  {
    id: "5",
    title: "Tech Symposium",
    description: "Conference on emerging technologies with guest speakers from industry.",
    date: new Date(2025, 5, 18),
    time: "9:00 AM - 5:00 PM",
    venue: "Conference Hall",
    type: "academic",
    attendees: 120,
    capacity: 150,
    status: "completed",
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterType, setFilterType] = React.useState<string>("all")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || event.type === filterType
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const typeColors = {
    academic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    cultural: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    sports: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    social: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
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
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground">View and register for university events</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
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
            variant={filterType === "academic" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("academic")}
          >
            Academic
          </Button>
          <Button
            variant={filterType === "cultural" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("cultural")}
          >
            Cultural
          </Button>
          <Button
            variant={filterType === "sports" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("sports")}
          >
            Sports
          </Button>
          <Button
            variant={filterType === "social" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("social")}
          >
            Social
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
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <PartyPopper className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No events found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredEvents.map((event) => {
            const daysUntil = getDaysUntil(event.date)
            return (
              <Card key={event.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={typeColors[event.type]}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    {event.status === "upcoming" && (
                      <Badge variant="outline" className={daysUntil <= 7 ? "border-orange-600 text-orange-600" : ""}>
                        {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.attendees} attending
                        {event.capacity && ` / ${event.capacity} capacity`}
                      </span>
                    </div>
                    {event.capacity && (
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <Button className="w-full mt-auto" variant={event.status === "upcoming" ? "default" : "outline"}>
                    {event.status === "upcoming" ? "Register" : "View Details"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
            <CardDescription>Total Events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEvents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockEvents.filter((e) => e.status === "upcoming").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Attendees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockEvents.reduce((sum, e) => sum + e.attendees, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {mockEvents.filter((e) => e.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
