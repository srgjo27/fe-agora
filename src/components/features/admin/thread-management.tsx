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
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Threads Management</h2>
                <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsAddCategoryModalOpen(true)}
                    size="sm"
                >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Category
                </Button>
            </div>

            <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50">
                <CardContent className="p-0">
                    <div className="mb-4 border-b border-gray-700/50">
                        <Input
                            type="text"
                            placeholder="Search threads..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700/30">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Author
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/30">
                                {filteredThreads && filteredThreads.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center">
                                            <div className="text-gray-400">No threads found</div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredThreads?.map((thread) => (
                                        <tr key={thread.id} className="hover:bg-gray-700/20">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium rounded-full text-white bg-blue-400">
                                                    {thread.category?.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium text-gray-400">
                                                    {thread.title}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {thread.author?.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {formatRelativeTime(thread.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-400 hover:text-blue-300">
                                                        <EyeIcon className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-green-400 hover:text-green-300">
                                                        <PencilIcon className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-red-400 hover:text-red-300">
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
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
            {
                meta && meta.total_pages > 1 && (
                    <div className="flex justify-center items-center space-x-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
                        >
                            <ChevronLeftIcon className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <span className="text-gray-400 text-sm">
                            Page <span className="text-white font-medium">{page}</span> of{" "}
                            <span className="text-white font-medium">{meta.total_pages}</span>
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.min(meta.total_pages, p + 1))}
                            disabled={page === meta.total_pages}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50"
                        >
                            Next
                            <ChevronRightIcon className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )
            }

            <AddCategoryModal
                isOpen={isAddCategoryModalOpen}
                onClose={() => setIsAddCategoryModalOpen(false)}
                onSubmit={handleCreateCategory}
                isLoading={isLoading}
            />
        </div >
    );
}
