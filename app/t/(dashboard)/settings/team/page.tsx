"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function TeamSettingsPage() {
  const [campus, setCampus] = React.useState("gr-noida")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Team Settings</h1>
        <p className="text-muted-foreground">Manage your institution context</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Campus</CardTitle>
          <CardDescription>Select your current campus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Campus</Label>
            <Select value={campus} onValueChange={setCampus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gr-noida">Greater Noida</SelectItem>
                <SelectItem value="gurgaon">Gurgaon</SelectItem>
                <SelectItem value="lodhi-road">Lodhi Road</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}