"use client";

import { useState } from "react";
import { Card, CardContent, Input, Button } from "@/components/ui";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { forumService } from "@/services";
import { CategoryRequest } from "@/types";
import { useThreads } from "@/hooks";
import { formatRelativeTime } from "@/utils";
import { AddCategoryModal } from "@/components/features";

export function ThreadManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { threads, meta } = useThreads({
    page,
    limit: 10,
  });

  const handleCreateCategory = async (categoryData: CategoryRequest) => {
    setIsLoading(true);

    try {
      await forumService.createCategory(categoryData);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredThreads = threads?.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.author?.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Threads Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor discussions and manage categories
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
          onClick={() => setIsAddCategoryModalOpen(true)}
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card className="bg-gray-900 border-gray-800 overflow-hidden">
        <CardContent className="p-0">
          {/* Toolbar */}
          <div className="py-4 border-b border-gray-800 bg-gray-900/50">
            <div className="relative max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search threads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-gray-950 border-gray-800 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-950/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredThreads && filteredThreads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-gray-500 text-sm">
                        No threads found matching your search.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredThreads?.map((thread) => (
                    <tr
                      key={thread.id}
                      className="group hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {thread.category?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors block max-w-xs truncate">
                          {thread.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                            {thread.author?.username?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-400">
                            {thread.author?.username}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {formatRelativeTime(thread.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            title="View Thread"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                            title="Edit Thread"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete Thread"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="group-hover:hidden">
                          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600 ml-auto" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {meta && meta.total_pages > 1 && (
        <div className="flex justify-center items-center space-x-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border-gray-800 bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <span className="text-gray-500 text-sm font-mono">
            Page <span className="text-white font-medium">{page}</span> of{" "}
            <span className="text-white font-medium">{meta.total_pages}</span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(meta.total_pages, p + 1))}
            disabled={page === meta.total_pages}
            className="border-gray-800 bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50"
          >
            Next
            <ChevronRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSubmit={handleCreateCategory}
        isLoading={isLoading}
      />
    </div>
  );
}
