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
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Community Forum
            </h1>
            <p className="text-slate-500 text-base font-medium">
              Connect, collaborate, and share knowledge with the community.
            </p>
          </div>
          <ClientOnly>
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-200"
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
