"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Select,
  Textarea,
  Button,
  Background,
  Card,
  CardContent,
  Loading,
} from "@/components/ui";
import { ArrowLeftIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { useFormValidation } from "@/hooks";
import { CommonValidationRules } from "@/utils";
import { useAuthSelector } from "@/store";
import { CategoryResponse, ThreadRequest } from "@/types";
import { forumService } from "@/services";
import { ClientOnly } from "@/components/providers";
import { ROUTES } from "@/constants";

export default function CreateThreadPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthSelector();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, formErrors, handleChange, validateAllFields } =
    useFormValidation<ThreadRequest>({
      initialData: { title: "", content: "", category_id: "" },
      validationRules: {
        title: CommonValidationRules.name,
        content: CommonValidationRules.content,
        category_id: {
          required: true,
        },
      },
    });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);

      try {
        const categoriesData = await forumService.getCategories();
        setCategories(categoriesData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) return;

    setIsSubmitting(true);
    try {
      const threadData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category_id: formData.category_id,
      };

      await forumService.createThread(threadData);
      router.push(ROUTES.COMMUNITY.FORUM);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ClientOnly>
      {isAuthenticated && (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          <Background />

          <div className="relative z-10">
            {/* Enhanced Header */}
            <header className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                  <div className="flex items-center space-x-6">
                    <Button
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium"
                      variant="ghost"
                      onClick={handleCancel}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      <span>Back to Forum</span>
                    </Button>

                    <div className="flex items-center space-x-4">
                      <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                          Create New Thread
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          Share your ideas with the community
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 px-2 py-2 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-md border border-gray-200/50 dark:border-gray-600/50">
                    <div className="flex items-center justify-center w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {user?.username}
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-3">
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                            <PlusIcon className="w-4 h-4 text-white" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            New Discussion
                          </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          Create a new thread to start engaging discussions with
                          the community. Make sure your content is clear and
                          follows our community guidelines.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Title Field */}
                        <div className="bg-gray-50/80 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/30">
                          <Input
                            label="Thread Title"
                            type="text"
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm focus:shadow-md transition-shadow duration-200"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter a clear and engaging title..."
                            helpText="Choose a descriptive title that summarizes your discussion topic"
                            error={formErrors.title}
                            disabled={isSubmitting}
                            required
                          />
                        </div>

                        {/* Category Field */}
                        <div className="bg-gray-50/80 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/30">
                          <Select
                            label="Discussion Category"
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            options={categories.map((category) => ({
                              value: category.id,
                              label: category.name,
                            }))}
                            placeholder="Choose the most relevant category"
                            error={formErrors.category_id}
                            disabled={isSubmitting || isLoading}
                            helpText="Select the category that best fits your discussion topic"
                            required
                          />
                        </div>

                        {/* Content Field */}
                        <div className="bg-gray-50/80 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/30">
                          <Textarea
                            label="Thread Content"
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Share your thoughts, questions, or ideas in detail..."
                            rows={12}
                            error={formErrors.content}
                            helpText="Write engaging content that encourages discussion and follows community guidelines"
                            disabled={isSubmitting}
                            required
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm focus:shadow-md transition-shadow duration-200"
                          />
                        </div>

                        {/* Form Actions */}
                        <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/30">
                          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span>Ready to publish your thread</span>
                            </div>

                            <div className="flex space-x-3">
                              <Button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                variant="outline"
                                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all duration-200"
                              >
                                Cancel
                              </Button>

                              <Button
                                type="submit"
                                disabled={
                                  isSubmitting ||
                                  !formData.title ||
                                  !formData.category_id ||
                                  !formData.content
                                }
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100"
                              >
                                {isSubmitting ? (
                                  <div className="flex items-center justify-center space-x-2">
                                    <Loading size="sm" variant="dots" />
                                    <span>Publishing...</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <PlusIcon className="w-5 h-5" />
                                    <span>Publish Thread</span>
                                  </div>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    {/* Guidelines Card */}
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Community Guidelines
                          </h3>
                        </div>
                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>
                              Be respectful and constructive in your discussions
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>
                              Choose clear, descriptive titles for better
                              engagement
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>
                              Select the most relevant category for your topic
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>
                              Use proper formatting to make content readable
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tips Card */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Pro Tips
                          </h3>
                        </div>
                        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                          <p className="leading-relaxed">
                            💡 <strong>Engage your audience:</strong> Ask
                            questions to encourage responses and create
                            meaningful discussions.
                          </p>
                          <p className="leading-relaxed">
                            🎯 <strong>Stay on topic:</strong> Keep your content
                            focused and relevant to the selected category.
                          </p>
                          <p className="leading-relaxed">
                            ✨ <strong>Quality over quantity:</strong>{" "}
                            Well-thought-out posts get better engagement than
                            rushed ones.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </ClientOnly>
  );
}
