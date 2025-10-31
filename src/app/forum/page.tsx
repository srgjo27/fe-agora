"use client";

import { MainLayout } from "@/components/layout";

export default function ForumPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Forum Discussions
          </h1>
          <p className="text-lg text-gray-600">
            Join conversations, share knowledge, and connect with the community
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
