"use client";

import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { z } from "zod";

const passwordSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface PasswordFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
}

export function PasswordForm({ onSuccess, onForgotPassword }: PasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState<{ identifier?: string; password?: string; form?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const validatedData = passwordSchema.parse(formData);
      // TODO: Connect to backend authentication
      console.log("Password login attempted with:", validatedData);
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated delay
      // Simulated error for demonstration purposes
      throw new Error("Auth provider not configured. Please use a different method or configure Supabase.");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        const errorsList = (error as any).errors;
        errorsList.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        setErrors({ form: error.message });
      } else {
        setErrors({ form: "An unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <AuthInput
        label="Email or Username"
        id="identifier"
        placeholder="you@example.com or johndoe"
        value={formData.identifier}
        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
        error={errors.identifier}
        disabled={isLoading}
      />
      <div>
        <AuthInput
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          disabled={isLoading}
        />
        {onForgotPassword && (
          <div className="flex justify-end mt-1">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-medium text-[#EC4899] hover:text-[#D93B86] hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>
        )}
      </div>

      {errors.form && (
        <div aria-live="polite" className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
          {errors.form}
        </div>
      )}

      <AuthButton type="submit" isLoading={isLoading} className="mt-2 text-[15px]">
        Sign In
      </AuthButton>
    </form>
  );
}
