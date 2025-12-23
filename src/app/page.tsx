"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthSelector } from "@/store";
import { ROUTES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Zap, ArrowRight } from "lucide-react";

export default function HomePage() {
  const { isAuthenticated } = useAuthSelector();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center space-y-8">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Welcome to Agora
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A modern platform for meaningful conversations. Connect, discuss,
            and share ideas with a vibrant community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {mounted && isAuthenticated ? (
            <>
              <Link href={ROUTES.DASHBOARD.HOME}>
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href={ROUTES.COMMUNITY.FORUM}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-gray-700 hover:bg-gray-800"
                >
                  Browse Forum
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={ROUTES.AUTH.REGISTER}>
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href={ROUTES.AUTH.LOGIN}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-gray-700 hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MessageSquare className="w-10 h-10 text-blue-500" />}
            title="Engaging Discussions"
            description="Create threads, reply to posts, and engage in deep conversations about topics you care about."
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-purple-500" />}
            title="Vibrant Community"
            description="Connect with like-minded individuals and build your reputation within the community."
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-yellow-500" />}
            title="Real-time Interaction"
            description="Experience a fast and responsive interface built with modern web technologies."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2025 Agora. All rights reserved.</p>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}
