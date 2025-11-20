"use client";

import { useEffect } from "react";
import { Modal, ModalBody, ModalFooter } from "@/components/ui/modal";
import { Input, Button, Loading } from "@/components/ui";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useFormValidation } from "@/hooks";
import { CommonValidationRules, ValidationRule } from "@/utils";
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
        description: CommonValidationRules.description,
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Category"
      size="md"
      closeOnOverlayClick={!isLoading}
    >
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="space-y-4">
            {/* Category Name */}
            <div>
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Category Name *
              </label>
              <Input
                id="categoryName"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className={`w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                  formErrors.name ? "border-red-500 focus:ring-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
              )}
            </div>

            {/* Category Description */}
            <div>
              <label
                htmlFor="categoryDescription"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Description (Optional)
              </label>
              <textarea
                id="categoryDescription"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter category description (optional)"
                rows={4}
                className={`w-full px-3 py-2 border bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.description
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
                disabled={isLoading}
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {formErrors.description}
                </p>
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="mr-2 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loading size="md" variant="dots" />
              </div>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Category
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
