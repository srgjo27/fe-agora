"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Input, Button } from "@/components/ui";
import {
    EyeIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
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
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center">
                                            <div className="text-gray-400">Loading users...</div>
                                        </td>
                                    </tr>
                                ) : filteredUsers && filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center">
                                            <div className="text-gray-400">No users found</div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers?.map((userData) => (
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
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${userData.role === "admin"
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
}
