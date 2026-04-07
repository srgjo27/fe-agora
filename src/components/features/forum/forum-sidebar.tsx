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
            size="md"
            onClick={() => router.push("/forum/create")}
            className="w-full"
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
          className="w-full justify-start hover:text-blue-600 hover:bg-blue-50 "
        >
          <HomeIcon className="w-5 h-5 mr-3 text-slate-500" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:text-blue-600 hover:bg-blue-50 "
        >
          <FireIcon className="w-5 h-5 mr-3 text-slate-500" />
          Popular
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">
          Categories
        </h3>
        <div className="space-y-1">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-slate-400 animate-pulse">
              Loading categories...
            </div>
          ) : (
            categories?.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="w-full justify-start hover:text-blue-600 hover:bg-blue-50 group"
              >
                <HashtagIcon className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                {category.name}
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
