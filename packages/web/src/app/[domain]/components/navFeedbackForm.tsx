"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { submitFeedback } from "@/actions"
import { useToast } from "@/components/hooks/use-toast"
import { Input } from "@/components/ui/input"

export function FeedbackForm() {
    const [open, setOpen] = useState(false)
    const [feedback, setFeedback] = useState("")
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async () => {
        if (!feedback.trim()) return

        setIsSubmitting(true)
        try {
            await submitFeedback(feedback, email)
            toast({
                title: "Feedback submitted",
                description: "Thank you for your feedback!",
            })
            setFeedback("")
            setEmail("")
            setOpen(false)
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit feedback. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className={navigationMenuTriggerStyle()}>Feedback</PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <h4 className="font-medium">Send Feedback</h4>
                    </div>
                    <Input
                        type="email"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Textarea
                        placeholder="Tell us what you think..."
                        value={feedback}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
                        className="min-h-24"
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleSubmit} disabled={isSubmitting || !feedback.trim()}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
