"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui";
import {
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    FolderIcon,
} from "@heroicons/react/24/outline";
import { dashboardService, forumService } from "@/services";

export function DashboardOverview() {
    const [stats, setStats] = useState({
        users: 0,
        threads: 0,
        categories: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [users, threads, categories] = await Promise.all([
                    dashboardService.getUsers(),
                    forumService.getThreads({ page: 1, limit: 1 }), // We just need the total count if available, but API might not return total count directly in summary.
                    // Wait, getThreads returns PaginatedResponse which usually has total.
                    forumService.getCategories(),
                ]);

                setStats({
                    users: users.length,
                    threads: threads.meta?.total_items || 0,
                    categories: categories.length,
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Users",
            value: stats.users,
            icon: UserGroupIcon,
            color: "text-blue-400",
            bgColor: "bg-blue-400/10",
        },
        {
            title: "Total Threads",
            value: stats.threads,
            icon: ChatBubbleLeftRightIcon,
            color: "text-green-400",
            bgColor: "bg-green-400/10",
        },
        {
            title: "Total Categories",
            value: stats.categories,
            icon: FolderIcon,
            color: "text-purple-400",
            bgColor: "bg-purple-400/10",
        },
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card
                        key={i}
                        className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 animate-pulse"
                    >
                        <CardContent className="p-6">
                            <div className="h-16 bg-gray-700/50 rounded-lg"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <Card
                        key={index}
                        className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 hover:border-gray-600 transition-colors"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-400">
                                        {stat.title}
                                    </p>
                                    <p className="text-3xl font-bold text-white mt-2">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
