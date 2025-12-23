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
      {/* Action Button */}
      <ClientOnly>
        {isAuthenticated && (
          <Button
            size="lg"
            onClick={() => router.push("/forum/create")}
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-500/20 border-0 font-medium"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Discussion
          </Button>
        )}
      </ClientOnly>

      {/* Main Navigation */}
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 font-medium"
        >
          <HomeIcon className="w-5 h-5 mr-3 text-gray-400" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 font-medium"
        >
          <FireIcon className="w-5 h-5 mr-3 text-gray-400" />
          Popular
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">
          Categories
        </h3>
        <div className="space-y-1">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500 animate-pulse">
              Loading categories...
            </div>
          ) : (
            categories?.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 text-sm font-medium group"
              >
                <HashtagIcon className="w-4 h-4 mr-3 text-gray-600 group-hover:text-blue-400 transition-colors" />
                {category.name}
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
