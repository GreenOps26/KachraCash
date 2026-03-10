"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, type = "text", label, error, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(7);
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-1.5 w-full">
        <label htmlFor={inputId} className="text-sm font-medium text-[#1F2937]">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={currentType}
            id={inputId}
            className={cn(
              "flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-[#1F2937] placeholder:text-gray-400 focus:border-[#EC4899] focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              isPassword && "pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-[#EC4899]"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <div aria-live="polite" className="min-h-[20px]">
          {error && (
            <p id={`${inputId}-error`} className="text-xs font-medium text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);
AuthInput.displayName = "AuthInput";

export { AuthInput };
