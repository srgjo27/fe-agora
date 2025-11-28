"use client";

import { useCategories } from "@/hooks/use-forum";
import { Button } from "@/components/ui/button";
import {
    HomeIcon,
    FireIcon,
    HashtagIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ClientOnly } from "@/components/providers";

interface ForumSidebarProps {
    isAuthenticated: boolean;
}

export function ForumSidebar({ isAuthenticated }: ForumSidebarProps) {
    const { categories, isLoading } = useCategories();
    const router = useRouter();

    return (
        <div className="space-y-8">
            {/* Main Navigation */}
            <div className="space-y-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-green-400 hover:bg-gray-800/50 font-mono"
                >
                    <HomeIcon className="w-5 h-5 mr-3" />
                    Home
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 font-mono"
                >
                    <FireIcon className="w-5 h-5 mr-3" />
                    Popular
                </Button>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-4 font-mono">
                    Categories
                </h3>
                <div className="space-y-1">
                    {isLoading ? (
                        <div className="px-4 py-2 text-sm text-gray-500 font-mono animate-pulse">
                            loading_categories...
                        </div>
                    ) : (
                        categories?.map((category) => (
                            <Button
                                key={category.id}
                                variant="ghost"
                                className="w-full justify-start text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 font-mono text-sm"
                            >
                                <HashtagIcon className="w-4 h-4 mr-3 text-gray-600 group-hover:text-cyan-400" />
                                {category.name}
                            </Button>
                        ))
                    )}
                </div>
            </div>

            {/* Action Button */}
            <ClientOnly>
                {isAuthenticated && (
                    <div className="pt-4">
                        <Button
                            size="lg"
                            onClick={() => router.push("/forum/create")}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20 font-mono border-0"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            New Thread
                        </Button>
                    </div>
                )}
            </ClientOnly>
        </div>
    );
}
