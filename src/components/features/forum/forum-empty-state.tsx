"use client";

import { Button, Card, CardContent } from "@/components/ui";
import { ClientOnly } from "@/components/providers";

interface ForumEmptyStateProps {
    isAuthenticated: boolean;
}

export function ForumEmptyState({ isAuthenticated }: ForumEmptyStateProps) {
    return (
        <Card className="backdrop-blur-xl bg-gray-800/50 border border-gray-600/50 text-center shadow-2xl">
            <CardContent className="py-24 font-mono">
                <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gray-700 border border-gray-500/30 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-xl">
                        <div className="w-24 h-24 bg-gray-800 border border-green-500/30 flex items-center justify-center shadow-xl">
                            <span className="text-4xl text-green-400">?</span>
                        </div>
                    </div>
                    <div className="absolute -top-2 -right-8 w-6 h-6 bg-green-400 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-700"></div>
                </div>
                <h3 className="text-3xl font-bold text-green-400 mb-4">
                    &gt; No threads found
                </h3>
                <p className="text-gray-300 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                    {`// Start the first discussion in this terminal`}
                </p>
                <ClientOnly>
                    {isAuthenticated && (
                        <Button
                            size="lg"
                            className="bg-gray-800 border border-green-500/50 hover:border-green-400 hover:bg-gray-700 shadow-xl shadow-green-500/25 transform hover:scale-105 transition-all duration-300 text-lg px-10 py-4 font-mono text-green-400 hover:text-green-300"
                        >
                            <span className="mr-2">&gt;</span>
                            init_first_thread()
                        </Button>
                    )}
                </ClientOnly>
            </CardContent>
        </Card>
    );
}
