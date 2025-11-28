"use client";

import { useAppDispatch, useAuthSelector } from "@/store";
import { logoutUser } from "@/store/slices/authSlice";
import { Button } from "@/components/ui";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export function ForumHeader() {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAuthSelector();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="relative backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50 shadow-2xl">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black font-mono bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                            &gt; FORUM_
                        </h1>
                        <p className="text-gray-400 text-sm font-mono">
                            {`// Connect, collaborate, and code together`}
                        </p>
                    </div>
                    {isAuthenticated && (
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                        >
                            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                            logout()
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
