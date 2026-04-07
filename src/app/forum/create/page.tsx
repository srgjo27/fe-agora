"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/use-form-validation";
import { forumService } from "@/services/forum-service";
import { CategoryResponse } from "@/types";
import {
  CreateThreadHeader,
  CreateThreadForm,
  CreateThreadTips,
  CreateThreadProgress,
} from "@/components/features";

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
      } catch (_) {
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
    } catch (_) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">
      <CreateThreadHeader
        onBack={() => router.back()}
        onDiscard={() => router.back()}
        onPublish={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Editor Area */}
          <div className="lg:col-span-8">
            <CreateThreadForm
              formData={formData}
              formErrors={formErrors}
              categories={categories}
              onChange={handleChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <CreateThreadTips />
            <CreateThreadProgress
              hasTitle={!!formData.title}
              hasCategory={!!formData.categoryId}
              hasContent={!!formData.content}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
