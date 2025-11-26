"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAuthSelector, logoutUser } from "@/store";
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui";
import { UserManagement, ThreadManagement, DashboardOverview } from "@/components/features";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuthSelector();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
  }, []);

  if (!isMounted) return null;

  if (!isAuthenticated || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-400 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-400 font-mono">Admin privileges required</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: ChartBarIcon },
    { id: "users", label: "Users", icon: UserGroupIcon },
    { id: "threads", label: "Threads", icon: ChatBubbleLeftRightIcon },
    { id: "posts", label: "Posts", icon: DocumentTextIcon },
    { id: "settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "users":
        return <UserManagement />;
      case "threads":
        return <ThreadManagement />;
      case "posts":
        return (
          <div className="text-gray-400 text-center py-12">
            Posts management coming soon...
          </div>
        );
      case "settings":
        return (
          <div className="text-gray-400 text-center py-12">
            Settings coming soon...
          </div>
        );
      default:
      // return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white font-mono">
                AGORA ADMIN
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm font-mono">
                Welcome, <span className="text-blue-400">{user.username}</span>
              </span>
              <Button
                onClick={() => dispatch(logoutUser())}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800/40 backdrop-blur-sm border-r border-gray-700/50 min-h-screen">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-mono text-sm transition-colors ${activeTab === item.id
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
