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
        className="text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 font-medium"
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2 text-slate-400" />
        Filter
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 font-medium"
      >
        <ChevronUpDownIcon className="w-4 h-4 mr-2 text-slate-400" />
        Latest
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300"
      >
        <Bars3Icon className="w-4 h-4 text-slate-400" />
      </Button>
    </div>
  );
}
