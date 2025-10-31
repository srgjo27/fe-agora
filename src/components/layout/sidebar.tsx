// Sidebar component untuk dashboard
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  navigation: SidebarItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({
  navigation,
  isCollapsed = false,
  onToggle,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-gray-900 text-white transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && <h2 className="text-lg font-semibold">Navigation</h2>}
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <svg
              className={cn(
                "w-5 h-5 transition-transform",
                isCollapsed && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
              title={isCollapsed ? item.name : ""}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {!isCollapsed && (
                <>
                  <span className="ml-3">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed && (
          <div className="text-xs text-gray-400">© 2025 Agora Platform</div>
        )}
      </div>
    </div>
  );
};
