"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle, Mail, Phone, MessageCircle, Book, FileText, MessageSquare } from "lucide-react"

const faqs = [
  {
    question: "How do I register for courses?",
    answer: "You can register for courses through the Courses page. Navigate to the course you want and click 'Register'.",
  },
  {
    question: "How do I submit assignments?",
    answer: "Go to Courses > Assignments, find your assignment, and click 'Submit' to upload your work.",
  },
  {
    question: "Where can I view my grades?",
    answer: "Your grades are available in Courses > Results. You can view all your course grades and overall GPA there.",
  },
  {
    question: "How do I update my profile?",
    answer: "Navigate to Dashboard > Profile to update your personal information, academic details, and account settings.",
  },
  {
    question: "How do I pay my fees?",
    answer: "Go to Finances > Billing to view your bills and make payments using your registered payment method.",
  },
]

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Get help and contact support</p>
      </div>

      {/* Contact Support */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
              <Mail className="h-6 w-6" />
            </div>
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Send us an email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">support@iilm.com</p>
            <Button variant="outline" className="w-full">
              Send Email
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
              <Phone className="h-6 w-6" />
            </div>
            <CardTitle>Phone Support</CardTitle>
            <CardDescription>Call us directly</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">+1 (555) 123-4567</p>
            <p className="text-xs text-muted-foreground mb-4">Mon-Fri, 9 AM - 5 PM</p>
            <Button variant="outline" className="w-full">
              Call Now
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2">
              <MessageCircle className="h-6 w-6" />
            </div>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Chat with support</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">Available 24/7</p>
            <Button variant="outline" className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No FAQs found matching your search.</p>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium mb-2">{faq.question}</div>
                      <div className="text-sm text-muted-foreground">{faq.answer}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>Helpful documents and guides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="justify-start h-auto py-4">
              <Book className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">User Guide</div>
                <div className="text-xs text-muted-foreground">Complete guide to using the platform</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4">
              <FileText className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Documentation</div>
                <div className="text-xs text-muted-foreground">Technical documentation and API reference</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4">
              <MessageSquare className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Community Forum</div>
                <div className="text-xs text-muted-foreground">Connect with other students</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4">
              <HelpCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Video Tutorials</div>
                <div className="text-xs text-muted-foreground">Watch video guides and tutorials</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
