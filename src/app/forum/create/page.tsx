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
import {
  ArrowLeftIcon,
  CommandLineIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useFormValidation } from "@/hooks";
import { CommonValidationRules } from "@/utils";
import { useAuthSelector } from "@/store";
import { CategoryResponse, ThreadRequest } from "@/types";
import { forumService } from "@/services";
import { ClientOnly } from "@/components/providers";
import { ROUTES } from "@/constants";

export default function CreateThreadPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthSelector();
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
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden font-mono">
          <Background />

          {/* Header */}
          <div className="relative backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50 shadow-2xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-green-400 hover:bg-gray-800/50 border border-gray-600/50 hover:border-green-500/30"
                  >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    cd ..
                  </Button>
                  <div className="h-6 w-px bg-gray-700"></div>
                  <h1 className="text-xl font-bold text-green-400 flex items-center">
                    <span className="mr-2">&gt;</span>
                    INIT_NEW_THREAD
                    <span className="animate-pulse ml-1">_</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="backdrop-blur-xl bg-gray-800/50 border border-gray-600/50 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6 border-b border-gray-700/50 pb-4">
                      <CommandLineIcon className="w-6 h-6 text-green-400" />
                      <h2 className="text-lg font-bold text-gray-200">
                        Thread Configuration
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Title Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="title"
                          className="text-sm text-gray-400 flex items-center"
                        >
                          <span className="text-green-400 mr-2">$</span>
                          set_title
                        </label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Enter thread title..."
                          className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-600 focus:border-green-500/50 focus:ring-green-500/20 font-mono"
                          error={formErrors.title}
                          disabled={isSubmitting}
                          required
                        />
                      </div>

                      {/* Category Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="category_id"
                          className="text-sm text-gray-400 flex items-center"
                        >
                          <span className="text-green-400 mr-2">$</span>
                          select_category
                        </label>
                        <Select
                          id="category_id"
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                          options={categories.map((category) => ({
                            value: category.id,
                            label: category.name,
                          }))}
                          placeholder="Choose category..."
                          className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-600 focus:border-green-500/50 focus:ring-green-500/20 font-mono"
                          error={formErrors.category_id}
                          disabled={isSubmitting || isLoading}
                          required
                        />
                      </div>

                      {/* Content Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="content"
                          className="text-sm text-gray-400 flex items-center"
                        >
                          <span className="text-green-400 mr-2">$</span>
                          write_content
                        </label>
                        <Textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          placeholder="Type your message here..."
                          rows={12}
                          className="bg-gray-900/50 border-gray-600/50 text-white placeholder-gray-600 focus:border-green-500/50 focus:ring-green-500/20 font-mono"
                          error={formErrors.content}
                          disabled={isSubmitting}
                          required
                        />
                      </div>

                      {/* Form Actions */}
                      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700/50">
                        <Button
                          type="button"
                          onClick={handleCancel}
                          disabled={isSubmitting}
                          variant="ghost"
                          className="text-gray-400 hover:text-red-400 hover:bg-gray-800/50 border border-gray-600/50 hover:border-red-500/30"
                        >
                          abort()
                        </Button>

                        <Button
                          type="submit"
                          disabled={
                            isSubmitting ||
                            !formData.title ||
                            !formData.category_id ||
                            !formData.content
                          }
                          className="bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-600/30 hover:text-green-300 shadow-lg shadow-green-500/10"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <Loading size="sm" variant="dots" />
                              <span>executing...</span>
                            </div>
                          ) : (
                            <span>publish_thread()</span>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Guidelines Card */}
                <Card className="backdrop-blur-xl bg-gray-800/50 border border-gray-600/50 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4 border-b border-gray-700/50 pb-2">
                      <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                        README.md
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm text-gray-400 font-mono">
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-400">-</span>
                        <p>Be respectful and constructive.</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-400">-</span>
                        <p>Use clear, descriptive titles.</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-400">-</span>
                        <p>Select the correct category.</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-400">-</span>
                        <p>Format code blocks properly.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips Card */}
                <Card className="backdrop-blur-xl bg-gray-800/50 border border-yellow-600/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4 border-b border-gray-700/50 pb-2">
                      <LightBulbIcon className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                        HINTS
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm text-gray-400 font-mono">
                      <p>
                        <span className="text-yellow-400">TIP:</span> Ask
                        questions to encourage discussion.
                      </p>
                      <p>
                        <span className="text-yellow-400">TIP:</span> Keep it
                        focused on the topic.
                      </p>
                      <p>
                        <span className="text-yellow-400">TIP:</span> Quality
                        &gt; Quantity.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Warning Card */}
                <Card className="backdrop-blur-xl bg-gray-800/50 border border-red-600/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4 border-b border-gray-700/50 pb-2">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                      <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                        WARNING
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 font-mono">
                      Violating community guidelines may result in account
                      suspension.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </ClientOnly>
  );
}
