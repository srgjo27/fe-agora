"use client";

import { Button, Card, CardContent } from "@/components/ui";
import { ClientOnly } from "@/components/providers";

interface ForumEmptyStateProps {
  isAuthenticated: boolean;
}

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export function ForumEmptyState({ isAuthenticated }: ForumEmptyStateProps) {
  return (
    <Card className="bg-gray-900 border border-gray-800 text-center shadow-sm">
      <CardContent className="py-16">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No discussions yet
        </h3>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          Be the first to start a conversation in this community.
        </p>
      </CardContent>
    </Card>
  );
}
