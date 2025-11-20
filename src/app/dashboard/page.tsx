"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAuthSelector, logoutUser } from "@/store";
import { Card, CardContent } from "@/components/ui";
import { Input, Button } from "@/components/ui";
import { AddCategoryModal } from "@/components/features";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Shield } from "lucide-react";
import { dashboardService, forumService } from "@/services";
import { CategoryRequest, User } from "@/types";
import { useThreads } from "@/hooks";
import { formatRelativeTime } from "@/utils";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuthSelector();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const { threads } = useThreads({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setUsers(null);

      try {
        const usersData = await dashboardService.getUsers();
        setUsers(usersData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateCategory = async (categoryData: CategoryRequest) => {
    setIsLoading(true);

    try {
      await forumService.createCategory(categoryData);
    } finally {
      setIsLoading(false);
    }
  };

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

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50">
        <CardContent className="p-0">
          <div className="mb-4 border-b border-gray-700/50">
            <Input
              type="text"
              placeholder="Search users..."
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
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {users && users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center">
                      <div className="text-gray-400">No users found</div>
                    </td>
                  </tr>
                ) : (
                  users?.map((userData) => (
                    <tr key={userData.id} className="hover:bg-gray-700/20">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {userData.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {userData.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            userData.role === "admin"
                              ? "text-purple-400 bg-purple-400/10"
                              : "text-gray-400 bg-gray-400/10"
                          }`}
                        >
                          {userData.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(userData.created_at).toLocaleDateString()}
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
    </div>
  );

  const renderThreads = () => (
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
                {threads && threads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center">
                      <div className="text-gray-400">No threads found</div>
                    </td>
                  </tr>
                ) : (
                  threads?.map((thread) => (
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
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      // return renderOverview();
      case "users":
        return renderUsers();
      case "threads":
        return renderThreads();
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
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-mono text-sm transition-colors ${
                  activeTab === item.id
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

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSubmit={handleCreateCategory}
        isLoading={isLoading}
      />
    </div>
  );
}
