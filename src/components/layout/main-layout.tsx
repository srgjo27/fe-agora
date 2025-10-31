// Main layout wrapper untuk dashboard
import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export const MainLayout = ({
  children,
  showHeader = true,
  showFooter = true,
  user,
  onLogout,
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header user={user} onLogout={onLogout} />}

      <main className="flex-1">{children}</main>

      {showFooter && <Footer />}
    </div>
  );
};

// Dashboard layout dengan sidebar
interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export const DashboardLayout = ({
  children,
  sidebar,
  user,
  onLogout,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="flex">
        {sidebar && (
          <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            {sidebar}
          </aside>
        )}

        <main className={`flex-1 ${sidebar ? "ml-64" : ""}`}>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

// Auth layout untuk login/register
interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout = ({
  children,
  title = "Welcome to Agora",
  subtitle = "Please sign in to your account",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};
