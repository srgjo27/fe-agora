"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/use-form-validation";
import { forumService } from "@/services/forum-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { CategoryResponse } from "@/types";
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  InformationCircleIcon,
  PhotoIcon,
  LinkIcon,
  ListBulletIcon,
  CodeBracketIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

export default function CreateThreadPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [_, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, formErrors, handleChange, validateAllFields } =
    useFormValidation({
      initialData: {
        title: "",
        content: "",
        categoryId: "",
      },
      validationRules: {
        title: { required: true },
        content: { required: true },
        categoryId: { required: true },
      },
    });

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await forumService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!validateAllFields()) return;

    setIsSubmitting(true);
    try {
      await forumService.createThread({
        title: formData.title,
        content: formData.content,
        category_id: formData.categoryId,
      });
      router.push("/forum");
    } catch (error) {
      console.error("Failed to create thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-gray-800/40 bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 -ml-2"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="h-4 w-px bg-gray-800" />
            <span className="text-sm font-medium text-gray-500">Draft</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] border border-blue-500/50"
            >
              {isSubmitting ? (
                "Publishing..."
              ) : (
                <>
                  <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                  Publish Thread
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Editor Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Title Input */}
            <div className="space-y-4">
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your thread a title..."
                className="text-5xl font-bold bg-transparent border-none px-0 placeholder:text-gray-700 focus:ring-0 focus:ring-offset-0 h-auto py-2 leading-tight tracking-tight w-full"
              />
              {formErrors.title && (
                <p className="text-red-400 text-sm pl-1">{formErrors.title}</p>
              )}
            </div>

            {/* Category Selector - Pill Style */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  options={categories.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  placeholder="Select a channel..."
                  className="w-auto min-w-[180px] bg-gray-900/50 border-gray-800 text-gray-300 rounded-full px-5 py-2 text-sm hover:border-gray-700 hover:bg-gray-900 transition-all focus:ring-blue-500/20 focus:border-blue-500/50"
                />
                {formErrors.categoryId && (
                  <p className="absolute top-full left-0 mt-1 text-red-400 text-xs pl-2">
                    {formErrors.categoryId}
                  </p>
                )}
              </div>
              <span className="text-gray-600 text-sm">
                in which channel should this be posted?
              </span>
            </div>

            {/* Editor Toolbar */}
            <div className="flex items-center gap-2 py-4 border-y border-gray-800/30 text-gray-400 sticky top-20 bg-gray-950 z-20">
              <button className="p-2.5 hover:bg-gray-800/50 rounded-lg hover:text-gray-200 transition-all duration-200 group">
                <span className="font-bold serif group-hover:text-white">
                  B
                </span>
              </button>
              <button className="p-2.5 hover:bg-gray-800/50 rounded-lg hover:text-gray-200 transition-all duration-200 group">
                <span className="italic serif group-hover:text-white">I</span>
              </button>
              <div className="w-px h-5 bg-gray-800/50 mx-2" />
              <button className="p-2.5 hover:bg-gray-800/50 rounded-lg hover:text-gray-200 transition-all duration-200 group">
                <LinkIcon className="w-5 h-5 group-hover:text-white" />
              </button>
              <button className="p-2.5 hover:bg-gray-800/50 rounded-lg hover:text-gray-200 transition-all duration-200 group">
                <PhotoIcon className="w-5 h-5 group-hover:text-white" />
              </button>
              <div className="w-px h-5 bg-gray-800/50 mx-2" />
              <button className="p-2.5 hover:bg-gray-800/50 rounded-lg hover:text-gray-200 transition-all duration-200 group">
                <ListBulletIcon className="w-5 h-5 group-hover:text-white" />
              </button>
              <button className="p-2.5 hover:bg-gray-800/50 rounded-lg hover:text-gray-200 transition-all duration-200 group">
                <CodeBracketIcon className="w-5 h-5 group-hover:text-white" />
              </button>
              <button className="p-2.5 hover:bg-gray-800/50 rounded-lg hover:text-gray-200 transition-all duration-200 group">
                <HashtagIcon className="w-5 h-5 group-hover:text-white" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="min-h-[600px]">
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your thoughts here..."
                className="w-full h-full min-h-[600px] bg-transparent border-none p-4 text-lg text-gray-300 placeholder:text-gray-700 focus:ring-0 focus:ring-offset-0 resize-none leading-relaxed"
              />
              {formErrors.content && (
                <p className="text-red-400 text-sm mt-2">
                  {formErrors.content}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-900/10 border border-gray-800/20 rounded-2xl p-8 backdrop-blur-sm sticky top-32">
              <div className="flex items-center gap-2 mb-6 text-gray-400">
                <InformationCircleIcon className="w-5 h-5" />
                <h3 className="font-medium text-sm uppercase tracking-wider">
                  Posting Guidelines
                </h3>
              </div>
              <ul className="space-y-6 text-sm text-gray-500">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900/50 border border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600">
                    1
                  </span>
                  <span>
                    <strong className="text-gray-300 block mb-1 font-medium">
                      Be Specific
                    </strong>
                    Use a clear title and provide enough context for others to
                    understand your post.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900/50 border border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600">
                    2
                  </span>
                  <span>
                    <strong className="text-gray-300 block mb-1 font-medium">
                      Choose the Right Channel
                    </strong>
                    Select the most relevant category to ensure your post
                    reaches the right audience.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900/50 border border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600">
                    3
                  </span>
                  <span>
                    <strong className="text-gray-300 block mb-1 font-medium">
                      Respect the Community
                    </strong>
                    Keep discussions civil and constructive. Harassment is not
                    tolerated.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
