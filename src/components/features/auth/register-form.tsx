"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useAppDispatch,
  useAuthSelector,
  registerUser,
  clearError,
} from "@/store";
import { ROUTES } from "@/constants";
import { CommonValidationRules } from "@/utils";
import { useFormValidation } from "@/hooks";
import { RegisterRequest } from "@/types";
import {
  ErrorMessage,
  RegisterFormDivider,
  SocialLoginSection,
  RegisterFormFooter,
  FormInput,
  SubmitButton,
} from "./components";

export const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAuthSelector();
  const { formData, formErrors, handleChange, validateAllFields } =
    useFormValidation<RegisterRequest>({
      initialData: {
        username: "",
        email: "",
        password: "",
      },
      validationRules: {
        username: CommonValidationRules.username,
        email: CommonValidationRules.email,
        password: CommonValidationRules.password,
      },
    });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) return;

    const result = await dispatch(
      registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      router.push(`${ROUTES.AUTH.LOGIN}?registered=true`);
    }
  };

  return (
    <div className="space-y-6">
      {error && <ErrorMessage error={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <FormInput
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="enter_username"
            label="$ ./username"
            error={formErrors.username}
            disabled={isLoading}
          />

          <FormInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@domain.net"
            label="$ ./email_address"
            error={formErrors.email}
            disabled={isLoading}
          />

          <FormInput
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            label="$ ./secure_passkey"
            error={formErrors.password}
            disabled={isLoading}
          />
        </div>

        <SubmitButton label="npm run create" isLoading={isLoading} />
      </form>

      <RegisterFormDivider />
      <SocialLoginSection />
      <RegisterFormFooter />
    </div>
  );
};
