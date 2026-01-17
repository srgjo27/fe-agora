"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Button, Textarea } from "@/components/ui";
import { XMarkIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
import { useFormValidation } from "@/hooks";
import { CommonValidationRules } from "@/utils";
import { CategoryRequest } from "@/types";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryData: CategoryRequest) => Promise<void>;
  isLoading?: boolean;
}

export const AddCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: AddCategoryModalProps) => {
  const { formData, formErrors, handleChange, validateAllFields, resetForm } =
    useFormValidation<CategoryRequest>({
      initialData: { name: "", description: "" },
      validationRules: {
        name: CommonValidationRules.name,
        description: { required: false },
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) return;

    try {
      const submitData: CategoryRequest = {
        name: formData.name,
        description: formData.description ?? "",
      };

      await onSubmit(submitData);
      resetForm();
      onClose();
    } catch (_) {}
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? handleClose : undefined}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <FolderPlusIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    New Category
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded-md hover:bg-gray-800"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Category Name <span className="text-blue-400">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Technology, Design, Random"
                    disabled={isLoading}
                    className={`bg-gray-950/50 border-gray-800 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all ${
                      formErrors.name
                        ? "border-red-500/50 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-400">{formErrors.name}</p>
                  )}
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What is this category about?"
                    disabled={isLoading}
                    className="bg-gray-900/50 border-gray-800 focus:border-blue-500/50 focus:ring-blue-500/20 min-h-[100px] resize-none transition-all"
                  />
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 border border-blue-500/50 min-w-[140px]"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      "Create Category"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
