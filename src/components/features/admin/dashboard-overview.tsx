"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui";
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  FolderIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
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
          forumService.getThreads({ page: 1, limit: 1 }),
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
      trend: "+12% from last week",
      trendUp: true,
      color: "text-blue-400",
    },
    {
      title: "Total Threads",
      value: stats.threads,
      icon: ChatBubbleLeftRightIcon,
      trend: "+5% from last week",
      trendUp: true,
      color: "text-green-400",
    },
    {
      title: "Active Categories",
      value: stats.categories,
      icon: FolderIcon,
      trend: "No change",
      trendUp: null,
      color: "text-purple-400",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-48 bg-gray-900 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-40 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Overview
        </h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card
            key={index}
            className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 group relative overflow-hidden"
          >
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </p>
                <stat.icon
                  className={`w-5 h-5 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`}
                />
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-4xl font-bold text-white tracking-tight">
                  {stat.value.toLocaleString()}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {stat.trendUp === true ? (
                  <span className="text-green-400 flex items-center gap-1 bg-green-400/10 px-1.5 py-0.5 rounded">
                    <ArrowTrendingUpIcon className="w-3 h-3" />
                    {stat.trend}
                  </span>
                ) : stat.trendUp === false ? (
                  <span className="text-red-400 flex items-center gap-1 bg-red-400/10 px-1.5 py-0.5 rounded">
                    <ArrowTrendingDownIcon className="w-3 h-3" />
                    {stat.trend}
                  </span>
                ) : (
                  <span className="text-gray-500 flex items-center gap-1 bg-gray-800 px-1.5 py-0.5 rounded">
                    {stat.trend}
                  </span>
                )}
              </div>
            </CardContent>

            {/* Decorative background glow */}
            <div
              className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${stat.color.replace(
                "text-",
                "bg-"
              )}`}
            />
          </Card>
        ))}
      </div>

      {/* Placeholder for a chart or recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800 h-80 flex items-center justify-center text-gray-500 border-dashed">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Activity Chart Placeholder</p>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-800 h-80 flex items-center justify-center text-gray-500 border-dashed">
          <div className="text-center">
            <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Recent Discussions Placeholder</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
