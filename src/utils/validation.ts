// Validation utilities
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  url: /^https?:\/\/[^\s$.?#].[^\s]*$/,
  strongPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  creditCard: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
};

// Pre-built validation rules for common form fields
export const CommonValidationRules = {
  name: {
    required: true,
    minLength: 5,
    maxLength: 60,
    custom: (value: string) => {
      if (value && !/^[a-zA-Z\s]+$/.test(value)) {
        return "Name can only contain letters and spaces";
      }
      return null;
    },
  },
  username: {
    required: true,
    minLength: 5,
    maxLength: 30,
    custom: (value: string) => {
      if (value && !/^[a-zA-Z0-9_]+$/.test(value)) {
        return "Username can only contain letters, numbers, and underscores";
      }
      return null;
    },
  },
  email: {
    required: true,
    pattern: ValidationPatterns.email,
    custom: (value: string) => {
      if (value && !ValidationPatterns.email.test(value)) {
        return "Please enter a valid email address";
      }
      return null;
    },
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (value && value.length < 8) {
        return "Password must be at least 8 characters";
      }
      return null;
    },
  },
};

// Validate single field
export function validateField(
  value: any,
  rules: ValidationRule
): ValidationResult {
  const errors: string[] = [];

  if (
    rules.required &&
    (value === null || value === undefined || value === "")
  ) {
    errors.push("This field is required");
  }

  if (value !== null && value !== undefined && value !== "") {
    if (typeof value === "string") {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Must be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Must be no more than ${rules.maxLength} characters`);
      }
    }

    if (
      rules.pattern &&
      typeof value === "string" &&
      !rules.pattern.test(value)
    ) {
      errors.push("Invalid format");
    }

    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate form object
export function validateForm(
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    results[field] = validateField(data[field], fieldRules);
  }

  return results;
}

// Convert validation results to UI-friendly format
export function getFormErrors(
  validationResults: Record<string, ValidationResult>
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(validationResults).forEach(([field, result]) => {
    errors[field] =
      !result.isValid && result.errors.length > 0 ? result.errors[0] : "";
  });

  return errors;
}

// Check if form has any validation errors
export function hasValidationErrors(
  validationResults: Record<string, ValidationResult>
): boolean {
  return Object.values(validationResults).some((result) => !result.isValid);
}
