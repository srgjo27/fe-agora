"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useAppDispatch,
  useAuthSelector,
  loginUser,
  clearError,
} from "@/store";
import { ROUTES } from "@/constants";
import { CommonValidationRules } from "@/utils";
import { useFormValidation } from "@/hooks";
import { LoginRequest } from "@/types";
import {
  ErrorMessage,
  FormInput,
  FormControls,
  SubmitButton,
  FormDivider,
  SocialLoginSection,
  FormFooter,
} from "./components";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAuthSelector();
  const { formData, formErrors, handleChange, validateAllFields } =
    useFormValidation<LoginRequest>({
      initialData: {
        email: "",
        password: "",
      },
      validationRules: {
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
      loginUser({
        email: formData.email,
        password: formData.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      router.push(ROUTES.COMMUNITY.FORUM);
    }
  };

  return (
    <div className="space-y-6">
      {error && <ErrorMessage error={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <FormInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@domain.net"
            label="$ ./email_input"
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
            label="$ ./password_key"
            error={formErrors.password}
            disabled={isLoading}
          />
        </div>

        <FormControls />
        <SubmitButton label="npm run auth" isLoading={isLoading} />
        <FormDivider />
        <SocialLoginSection />
        <FormFooter />
      </form>
    </div>
  );
};
