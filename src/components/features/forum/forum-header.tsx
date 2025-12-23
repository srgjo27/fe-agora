"use client";

import { useAppDispatch, useAuthSelector } from "@/store";
import { logoutUser } from "@/store/slices/authSlice";
import { Button } from "@/components/ui";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { ClientOnly } from "@/components/providers";

export function ForumHeader() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuthSelector();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Community Forum
            </h1>
            <p className="text-gray-400 text-base">
              Connect, collaborate, and share knowledge with the community.
            </p>
          </div>
          <ClientOnly>
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                Log out
              </Button>
            )}
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}
