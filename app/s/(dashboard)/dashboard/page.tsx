"use client"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )
  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Grid: 12 columns on lg; sidebar on the right */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: classes grid spanning 8 columns */}
          <div className="lg:col-span-8 space-y-6">
            {/* Ongoing / Up next row */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Ongoing now */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm tracking-wide text-muted-foreground">Ongoing now</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="text-lg font-semibold text-primary">Mathematical Methods</div>
                      <Badge variant="secondary">MTS 241</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">8am - 10am</div>
                    <div className="text-sm font-medium">Dr. John Simon</div>
                    <Separator />
                    <div className="text-sm text-muted-foreground">Venue: JAO 2 Lecture Theatre</div>
                    <div className="flex gap-3 pt-2">
                      <Button className="flex-1">Join</Button>
                      <Button variant="secondary" className="flex-1">Share</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Up next */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm tracking-wide text-muted-foreground">Up next</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-lg font-semibold">Algorithms &amp; Data Structures</div>
                      </div>
                      <Badge variant="secondary">CSC 261</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">11am - 12pm</div>
                    <div className="text-sm font-medium">Dr. Cynthia A.</div>
                    <div className="text-sm text-muted-foreground">Venue: Multipurpose Building 2</div>
                    <Button variant="outline" className="w-full">Add reminder</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Later today row: two + add event */}
            <div className="grid gap-6 sm:grid-cols-3">
              <Card className="shadow-sm">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="text-primary font-semibold">Neural Networks</div>
                    <Badge variant="secondary">CSC 231</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">2pm - 3pm</div>
                  <div className="text-sm font-medium">Dr. Cynthia A.</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="text-primary font-semibold">Applied Statistics</div>
                    <Badge variant="secondary">CSC 231</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">11am - 12pm</div>
                  <div className="text-sm font-medium">Dr. Cynthia A.</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-dashed">
                <CardContent className="pt-6 h-full flex items-center justify-center">
                  <Button variant="outline">Add Event</Button>
                </CardContent>
              </Card>
            </div>

            {/* Notifications and Attendance */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-12"><Badge variant="secondary">P</Badge></TableCell>
                        <TableCell>
                          <div className="font-medium">Portal Maintenance</div>
                          <div className="text-sm text-muted-foreground">The student portal will be unavailable from 4pm ...</div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-12"><Badge variant="secondary">C</Badge></TableCell>
                        <TableCell>
                          <div className="font-medium">Computer Science SA</div>
                          <div className="text-sm text-muted-foreground">All 2nd year CSC students are to pay their college dues...</div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Virtual class attendance</CardTitle>
                    <Button variant="ghost" className="h-8 px-2 text-xs">View history</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Simple progress */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="w-full mr-3 h-2 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }} />
                      </div>
                      <div className="font-medium">25%</div>
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="secondary">MTS 241</Badge>
                        <div className="text-muted-foreground">Status: Verified</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="secondary">CSC 261</Badge>
                        <div className="text-muted-foreground">Status: Pending</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right sidebar: calendar and courses */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Calendar</CardTitle>
                  <Button variant="ghost" className="h-8 px-2 text-xs">View schedule</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Courses</CardTitle>
                  <Button variant="ghost" className="h-8 px-2 text-xs">View courses</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive p-3 text-sm">
                  You are yet to register for courses this year.
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">Mathematical Methods</div>
                      <div className="text-xs text-muted-foreground">4 hours - Twice weekly</div>
                    </div>
                    <Button variant="outline" size="sm">Courseware</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">Algorithms &amp; Data Stru.</div>
                      <div className="text-xs text-muted-foreground">3 hours - Twice weekly</div>
                    </div>
                    <Button variant="outline" size="sm">Courseware</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
