"use client";

import { Card, CardContent } from "@/components/ui";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export function ForumEmptyState() {
  return (
    <Card className="bg-white border border-slate-200 text-center">
      <CardContent className="py-16">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No discussions yet
        </h3>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
          Be the first to start a conversation in this community.
        </p>
      </CardContent>
    </Card>
  );
}
