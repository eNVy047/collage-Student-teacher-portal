"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Search, Calendar as CalendarIcon, Clock, MapPin, Users, BookOpen, Gift, PartyPopper } from "lucide-react"

interface ScheduleItem {
  id: string
  title: string
  type: "workshop" | "holiday" | "event"
  date: Date
  time?: string
  venue?: string
  description: string
  attendees?: number
}

const mockSchedule: ScheduleItem[] = [
  {
    id: "1",
    title: "Machine Learning Workshop",
    type: "workshop",
    date: new Date(2025, 5, 22),
    time: "2:00 PM - 5:00 PM",
    venue: "Computer Lab 3",
    description: "Learn the fundamentals of machine learning with hands-on projects.",
    attendees: 30,
  },
  {
    id: "2",
    title: "Independence Day",
    type: "holiday",
    date: new Date(2025, 7, 15),
    description: "University holiday - Independence Day celebration",
  },
  {
    id: "3",
    title: "Annual Science Fair",
    type: "event",
    date: new Date(2025, 5, 20),
    time: "10:00 AM - 4:00 PM",
    venue: "Main Auditorium",
    description: "Annual science fair showcasing innovative projects from students.",
    attendees: 150,
  },
  {
    id: "4",
    title: "Web Development Bootcamp",
    type: "workshop",
    date: new Date(2025, 5, 28),
    time: "9:00 AM - 5:00 PM",
    venue: "Computer Lab 1",
    description: "Intensive 3-day bootcamp covering modern web development technologies.",
    attendees: 40,
  },
  {
    id: "5",
    title: "Diwali Holiday",
    type: "holiday",
    date: new Date(2025, 9, 20),
    description: "University holiday - Diwali celebration",
  },
]

export default function SchedulerPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [filterType, setFilterType] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredSchedule = mockSchedule.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType
    return matchesSearch && matchesType
  })

  const typeIcons = {
    workshop: BookOpen,
    holiday: Gift,
    event: PartyPopper,
  }

  const typeColors = {
    workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    holiday: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    event: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  const getEventsForDate = (date: Date) => {
    return filteredSchedule.filter(
      (item) =>
        item.date.getDate() === date.getDate() &&
        item.date.getMonth() === date.getMonth() &&
        item.date.getFullYear() === date.getFullYear()
    )
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Scheduler</h1>
          <p className="text-muted-foreground">View your schedule, workshops, holidays, and events</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Schedule List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search schedule..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "workshop" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("workshop")}
              >
                Workshops
              </Button>
              <Button
                variant={filterType === "holiday" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("holiday")}
              >
                Holidays
              </Button>
              <Button
                variant={filterType === "event" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("event")}
              >
                Events
              </Button>
            </div>
          </div>

          {/* Schedule Items */}
          {filteredSchedule.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CalendarIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">No schedule items found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredSchedule.map((item) => {
                const Icon = typeIcons[item.type]
                return (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <Badge className={typeColors[item.type]}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription className="mb-3">{item.description}</CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{item.date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                            </div>
                            {item.time && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{item.time}</span>
                              </div>
                            )}
                            {item.venue && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{item.venue}</span>
                              </div>
                            )}
                            {item.attendees && (
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{item.attendees} attendees</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Right Column - Calendar */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
              {selectedDate && selectedDateEvents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium">
                    {selectedDateEvents.length} item{selectedDateEvents.length > 1 ? "s" : ""} on {selectedDate.toLocaleDateString()}
                  </div>
                  {selectedDateEvents.map((event) => {
                    const Icon = typeIcons[event.type]
                    return (
                      <div key={event.id} className="rounded-md border p-3 text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4" />
                          <div className="font-medium">{event.title}</div>
                        </div>
                        {event.time && <div className="text-xs text-muted-foreground">{event.time}</div>}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Workshops</span>
                <span className="font-bold">{mockSchedule.filter((s) => s.type === "workshop").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Holidays</span>
                <span className="font-bold">{mockSchedule.filter((s) => s.type === "holiday").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Events</span>
                <span className="font-bold">{mockSchedule.filter((s) => s.type === "event").length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
