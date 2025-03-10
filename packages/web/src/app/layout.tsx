import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "./queryClientProvider";
import { PostHogProvider } from "./posthogProvider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
    title: "Sourcebot",
    description: "Sourcebot",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            // @see : https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
            suppressHydrationWarning
        >
            <head>
                <title>Unity Code Search - Sourcebot</title>
                <meta name="og:title" content="Unity Code Search - Sourcebot" />
                <meta name="og:description" content="Search 1000+ Unity projects" />
                <meta name="og:image" content="https://unity.sourcebot.dev/unity_og_image.png" />
                <meta name="og:url" content="https://unity.sourcebot.dev" />
                <meta name="og:type" content="website" />
            </head>
            <body>
                <Toaster />
                <SessionProvider>
                    <PostHogProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <QueryClientProvider>
                                <TooltipProvider>
                                    {children}
                                </TooltipProvider>
                            </QueryClientProvider>
                        </ThemeProvider>
                    </PostHogProvider>
                </SessionProvider>
            </body>
        </html>
    );
}