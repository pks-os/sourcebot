"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { ConnectionList } from "../connections/components/connectionList"
import { useDomain } from "@/hooks/useDomain"
import Link from "next/link"

export function AddRepoButton({ displayAdminInfo }: { displayAdminInfo: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const domain = useDomain()

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <PlusCircle className="h-4 w-4" />
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                    <DialogHeader className="px-6 py-4 border-b">
                        <DialogTitle className="text-xl font-semibold">Add a New Repository</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-1">
                            {displayAdminInfo
                                ? "Repositories are added to Sourcebot using connections. To add a new repo, add it to an existing connection or create a new one."
                                : "Only administrators of this organization can add new repositories to Sourcebot."}
                        </DialogDescription>
                    </DialogHeader>

                    {displayAdminInfo ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-6">
                                <ConnectionList className="w-full" />
                            </div>
                            <DialogFooter className="flex justify-between items-center border-t p-4 px-6">
                                <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                                    <Link href={`/${domain}/connections`}>Add new connection</Link>
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    ) : (
                        <div className="flex-1 p-6">
                            <div className="rounded-lg border p-4 bg-muted/50">
                                <h3 className="font-medium mb-2">Want to index your own repositories?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    You can create your own Sourcebot organization to index and search your repositories.
                                </p>
                                <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                                    <Link href="https://app.sourcebot.dev">Register on Sourcebot Cloud</Link>
                                </Button>
                            </div>
                            <DialogFooter className="flex justify-end items-center mt-6">
                                <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
