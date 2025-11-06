"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Search,
  Filter,
  Plus,
  ChevronRight
} from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  venue: string
  type: "workshop" | "holiday" | "event" | "meeting"
  attendees?: number
  status: "upcoming" | "ongoing" | "past"
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Science Fair",
    description: "Join us for the annual science fair showcasing innovative projects from students across all departments.",
    date: new Date(2025, 5, 20),
    time: "10:00 AM - 4:00 PM",
    venue: "Main Auditorium",
    type: "event",
    attendees: 150,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Machine Learning Workshop",
    description: "Learn the fundamentals of machine learning with hands-on projects and real-world applications.",
    date: new Date(2025, 5, 22),
    time: "2:00 PM - 5:00 PM",
    venue: "Computer Lab 3",
    type: "workshop",
    attendees: 30,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Independence Day",
    description: "University holiday - Independence Day celebration",
    date: new Date(2025, 7, 15),
    time: "All Day",
    venue: "N/A",
    type: "holiday",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Student Council Meeting",
    description: "Monthly meeting to discuss student concerns and upcoming activities.",
    date: new Date(2025, 5, 18),
    time: "3:00 PM - 4:30 PM",
    venue: "Conference Room A",
    type: "meeting",
    attendees: 25,
    status: "upcoming",
  },
  {
    id: "5",
    title: "Career Fair 2025",
    description: "Meet top employers and explore career opportunities. Bring your resume!",
    date: new Date(2025, 5, 25),
    time: "9:00 AM - 3:00 PM",
    venue: "Sports Complex",
    type: "event",
    attendees: 200,
    status: "upcoming",
  },
  {
    id: "6",
    title: "Web Development Bootcamp",
    description: "Intensive 3-day bootcamp covering modern web development technologies.",
    date: new Date(2025, 5, 28),
    time: "9:00 AM - 5:00 PM",
    venue: "Computer Lab 1",
    type: "workshop",
    attendees: 40,
    status: "upcoming",
  },
]

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedType, setSelectedType] = React.useState<string>("all")

  const eventTypeColors = {
    workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    holiday: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    event: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    meeting: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || event.type === selectedType
    return matchesSearch && matchesType
  })

  const upcomingEvents = filteredEvents
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    )
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground">Stay updated with upcoming events, workshops, and holidays</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Events List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedType === "workshop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("workshop")}
                  >
                    Workshops
                  </Button>
                  <Button
                    variant={selectedType === "event" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("event")}
                  >
                    Events
                  </Button>
                  <Button
                    variant={selectedType === "holiday" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("holiday")}
                  >
                    Holidays
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CalendarIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-medium">No events found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                          <Badge className={eventTypeColors[event.type]}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        <CardDescription className="mt-2">{event.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{event.date.toLocaleDateString("en-US", { 
                          weekday: "long", 
                          year: "numeric", 
                          month: "long", 
                          day: "numeric" 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.venue}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      {event.status === "upcoming" && (
                        <Button size="sm">Register</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Right Column - Calendar and Upcoming */}
        <div className="lg:col-span-4 space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
              {selectedDate && selectedDateEvents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Separator />
                  <div className="text-sm font-medium">Events on {selectedDate.toLocaleDateString()}</div>
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="rounded-md border p-2 text-sm">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 5 events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No upcoming events</p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium text-sm">{event.title}</div>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {event.time}
                          </div>
                        </div>
                      </div>
                      {event !== upcomingEvents[upcomingEvents.length - 1] && <Separator className="mt-4" />}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
