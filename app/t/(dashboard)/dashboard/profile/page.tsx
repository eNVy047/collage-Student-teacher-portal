"use client"

import * as React from "react"
import settings from "../../settings/data.json"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const profile = (settings as { profile?: { email: string; phone: string } }).profile ?? {
    email: "",
    phone: "",
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Your basic information</p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatars/shadcn.jpg" alt="Teacher" />
            <AvatarFallback>TR</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">xoraxi</CardTitle>
            <CardDescription>Teacher</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">Email: {profile.email}</p>
          <p className="text-sm">Phone: {profile.phone}</p>
          <Button asChild size="sm" variant="secondary">
            <a href="/t/settings/general">Edit profile</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}