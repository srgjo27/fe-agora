"use client";

import { Button } from "@/components/ui/button";
import {
  AdjustmentsHorizontalIcon,
  ChevronUpDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export function ForumFilter() {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800 hover:border-gray-700 font-medium"
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
        Filter
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800 hover:border-gray-700 font-medium"
      >
        <ChevronUpDownIcon className="w-4 h-4 mr-2" />
        Latest
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800 hover:border-gray-700"
      >
        <Bars3Icon className="w-4 h-4" />
      </Button>
    </div>
  );
}
