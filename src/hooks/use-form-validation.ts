import { useState, useCallback, useRef } from "react";
import {
  validateForm,
  validateField as coreValidateField,
  getFormErrors,
  hasValidationErrors,
  ValidationRule,
  ValidationResult,
} from "@/utils";

interface UseFormValidationProps<T> {
  initialData: T;
  validationRules: Record<keyof T, ValidationRule>;
}

interface UseFormValidationReturn<T> {
  formData: T;
  formErrors: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  validateField: (fieldName: keyof T, value: string) => ValidationResult | null;
  validateAllFields: () => boolean;
  resetForm: () => void;
  clearErrors: () => void;
}

export function useFormValidation<T extends Record<string, any>>({
  initialData,
  validationRules,
}: UseFormValidationProps<T>): UseFormValidationReturn<T> {
  const [formData, setFormData] = useState<T>(initialData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const initialDataRef = useRef(initialData);

  const updateFieldError = useCallback((fieldName: keyof T, error: string) => {
    setFormErrors((prev) => ({
      ...prev,
      [fieldName as string]: error,
    }));
  }, []);

  const validateField = useCallback(
    (fieldName: keyof T, value: string) => {
      const fieldRules = validationRules[fieldName];

      if (!fieldRules) return null;

      const result = coreValidateField(value, fieldRules);

      updateFieldError(fieldName, result.errors[0] || "");

      return result;
    },
    [validationRules, updateFieldError]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      validateField(name as keyof T, value);
    },
    [validateField]
  );

  const validateAllFields = (): boolean => {
    const validationResults = validateForm(formData, validationRules);
    const errors = getFormErrors(validationResults);

    setFormErrors(errors);

    return !hasValidationErrors(validationResults);
  };

  const resetForm = useCallback(() => {
    setFormData(initialDataRef.current);
    setFormErrors({});
  }, []);

  const clearErrors = useCallback(() => {
    setFormErrors({});
  }, []);

  return {
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    handleChange,
    validateField,
    validateAllFields,
    resetForm,
    clearErrors,
  };
}
