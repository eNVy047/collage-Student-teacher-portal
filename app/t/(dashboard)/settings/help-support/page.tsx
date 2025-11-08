"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HelpSupportPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Get assistance with your account</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Reach out for help</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Email: support@iilm.edu</p>
          <div className="flex gap-2">
            <Button asChild>
              <a href="mailto:support@iilm.edu">Email Support</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/t/notice/important">View Notices</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}