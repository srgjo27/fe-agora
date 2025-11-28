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
        <div className="flex justify-center items-center space-x-4 pt-12">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="bg-gray-800/50 border-green-500/50 text-green-400 hover:bg-gray-700 hover:text-green-300 disabled:opacity-50 font-mono"
            >
                <ChevronLeftIcon className="w-4 h-4 mr-2" />
                prev_page()
            </Button>
            <span className="text-gray-400 font-mono text-sm">
                page <span className="text-green-400 font-bold">{page}</span> of{" "}
                <span className="text-green-400 font-bold">{totalPages}</span>
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="bg-gray-800/50 border-green-500/50 text-green-400 hover:bg-gray-700 hover:text-green-300 disabled:opacity-50 font-mono"
            >
                next_page()
                <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
}
