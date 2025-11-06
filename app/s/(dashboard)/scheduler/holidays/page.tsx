"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Search, Gift, Calendar as CalendarIcon, Clock } from "lucide-react"

interface Holiday {
  id: string
  name: string
  date: Date
  type: "national" | "university" | "religious"
  description?: string
  isAcademicBreak?: boolean
}

const mockHolidays: Holiday[] = [
  {
    id: "1",
    name: "Independence Day",
    date: new Date(2025, 7, 15),
    type: "national",
    description: "National holiday celebrating independence",
  },
  {
    id: "2",
    name: "Diwali",
    date: new Date(2025, 9, 20),
    type: "religious",
    description: "Festival of lights",
  },
  {
    id: "3",
    name: "Eid al-Fitr",
    date: new Date(2025, 2, 31),
    type: "religious",
    description: "End of Ramadan",
  },
  {
    id: "4",
    name: "Christmas",
    date: new Date(2025, 11, 25),
    type: "religious",
    description: "Christmas celebration",
  },
  {
    id: "5",
    name: "Republic Day",
    date: new Date(2025, 0, 26),
    type: "national",
    description: "National holiday",
  },
  {
    id: "6",
    name: "Mid-Semester Break",
    date: new Date(2025, 2, 10),
    type: "university",
    description: "Mid-semester academic break",
    isAcademicBreak: true,
  },
  {
    id: "7",
    name: "Summer Break",
    date: new Date(2025, 4, 15),
    type: "university",
    description: "Summer academic break",
    isAcademicBreak: true,
  },
]

export default function HolidaysPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [filterType, setFilterType] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredHolidays = mockHolidays.filter((holiday) => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || holiday.type === filterType
    return matchesSearch && matchesType
  })

  const typeColors = {
    national: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    university: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    religious: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  const upcomingHolidays = mockHolidays
    .filter((h) => h.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  const getDaysUntil = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Holidays</h1>
          <p className="text-muted-foreground">View university holidays and academic breaks</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Holidays List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search holidays..."
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
                variant={filterType === "national" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("national")}
              >
                National
              </Button>
              <Button
                variant={filterType === "university" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("university")}
              >
                University
              </Button>
              <Button
                variant={filterType === "religious" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("religious")}
              >
                Religious
              </Button>
            </div>
          </div>

          {/* Holidays List */}
          {filteredHolidays.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Gift className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">No holidays found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredHolidays.map((holiday) => {
                const daysUntil = getDaysUntil(holiday.date)
                return (
                  <Card key={holiday.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Gift className="h-5 w-5 text-muted-foreground" />
                            <CardTitle className="text-lg">{holiday.name}</CardTitle>
                            <Badge className={typeColors[holiday.type]}>
                              {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                            </Badge>
                            {holiday.isAcademicBreak && (
                              <Badge variant="outline">Academic Break</Badge>
                            )}
                          </div>
                          {holiday.description && (
                            <CardDescription className="mb-3">{holiday.description}</CardDescription>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{holiday.date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                            </div>
                            {holiday.date >= new Date() && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">
                                  {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days away`}
                                </span>
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

        {/* Right Column - Calendar and Upcoming */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View holidays on calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Holidays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingHolidays.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming holidays</p>
                ) : (
                  upcomingHolidays.map((holiday) => {
                    const daysUntil = getDaysUntil(holiday.date)
                    return (
                      <div key={holiday.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                        <div>
                          <div className="font-medium text-sm">{holiday.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {holiday.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {daysUntil}d
                        </Badge>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Holidays</span>
                <span className="font-bold">{mockHolidays.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Upcoming</span>
                <span className="font-bold text-green-600">{upcomingHolidays.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Academic Breaks</span>
                <span className="font-bold">{mockHolidays.filter((h) => h.isAcademicBreak).length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
