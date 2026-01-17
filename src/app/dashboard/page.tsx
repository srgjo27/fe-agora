"use client";

import { useState, useEffect } from "react";
import {
  useAppDispatch,
  useAuthSelector,
  logoutUser,
  useIsAuthenticated,
} from "@/store";
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui";
import { DashboardOverview } from "@/components/features";
import { UserManagement } from "@/components/features/admin/user-management";
import { ThreadManagement } from "@/components/features/admin/thread-management";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAuthSelector();
  const { isAuthenticated } = useIsAuthenticated();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
  }, []);

  if (!isMounted) return null;

  if (!isAuthenticated || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Access Denied
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            You do not have the required permissions to view this area. Please
            contact your system administrator.
          </p>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => dispatch(logoutUser())}
          >
            Return to Login
          </Button>
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
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <DocumentTextIcon className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-gray-400">
              Posts Management
            </h3>
            <p className="text-sm">
              This module is currently under development.
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <Cog6ToothIcon className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-lg font-medium text-gray-400">
              System Settings
            </h3>
            <p className="text-sm">Configuration options will appear here.</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-sans selection:bg-blue-500/30">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              AGORA
            </span>
          </div>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Main Menu
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                activeTab === item.id
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-gray-400 hover:bg-gray-900 hover:text-gray-200"
              }`}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
              <item.icon
                className={`w-5 h-5 ${
                  activeTab === item.id
                    ? "text-blue-400"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center text-sm text-gray-500">
              <span className="hover:text-gray-300 transition-colors cursor-pointer">
                Dashboard
              </span>
              <span className="mx-2 text-gray-700">/</span>
              <span className="text-gray-200 font-medium capitalize">
                {activeTab}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => dispatch(logoutUser())}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 gap-2"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
