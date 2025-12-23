"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Input, Button } from "@/components/ui";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { dashboardService } from "@/services";
import { User } from "@/types";

export function UserManagement() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            User Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage system users and permissions
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
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
                placeholder="Search users by name or email..."
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
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers && filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-gray-500 text-sm">
                        No users found matching your search.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((userData) => (
                    <tr
                      key={userData.id}
                      className="group hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
                            {userData.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                              {userData.username}
                            </div>
                            <div className="text-xs text-gray-500">
                              {userData.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            userData.role === "admin"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : "bg-gray-800 text-gray-400 border-gray-700"
                          }`}
                        >
                          {userData.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {new Date(userData.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete User"
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
    </div>
  );
}
