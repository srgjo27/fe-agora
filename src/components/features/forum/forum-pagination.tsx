"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ForumPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ForumPagination({
  page,
  totalPages,
  onPageChange,
}: ForumPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4 pt-8 border-t border-slate-200 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 bg-white disabled:opacity-40 transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-2" />
        Previous
      </Button>
      <span className="text-slate-500 text-sm font-medium">
        Page <span className="text-slate-900">{page}</span> of{" "}
        <span className="text-slate-900">{totalPages}</span>
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 bg-white disabled:opacity-40 transition-colors"
      >
        Next
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
