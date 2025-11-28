"use client";

import { Button } from "@/components/ui/button";
import {
    AdjustmentsHorizontalIcon,
    ChevronUpDownIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

export function ForumFilter() {
    return (
        <div className="flex items-center space-x-3">
            <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-green-400 hover:bg-gray-700/50 border border-gray-600/30 hover:border-green-500/30 backdrop-blur-sm font-mono"
            >
                <AdjustmentsHorizontalIcon className="w-4 h-4 text-green-400 mr-2" />
                filter
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 border border-gray-600/30 hover:border-blue-500/30 backdrop-blur-sm font-mono"
            >
                <ChevronUpDownIcon className="w-4 h-4 text-blue-400 mr-2" />
                sort_latest
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 border border-gray-600/30 hover:border-cyan-500/30 backdrop-blur-sm font-mono"
            >
                <Bars3Icon className="w-4 h-4 text-cyan-400" />
            </Button>
        </div>
    );
}
