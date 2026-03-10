"use client";

import { useState } from "react";
import { Loader2, ArrowLeft, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ForgotPasswordFormProps {
  onBack: () => void;
  className?: string;
}

export function ForgotPasswordForm({ onBack, className }: ForgotPasswordFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const isEmail = identifier.includes("@");

  const validate = (): boolean => {
    if (!identifier.trim()) {
      setError("Email or phone is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      setError("Please enter a valid email or phone number");
      return false;
    }

    setError("");
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      // The user's instruction implies a change in the toast message and potentially the flow.
      // The provided snippet in the instruction is syntactically incomplete as a direct replacement.
      // Assuming the intent is to update the toast message and add a simulated delay
      // within the successful path of the try block, and update the catch error type.
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated delay
      toast.info("Auth not initialized. Configure Supabase to complete setup.");
      setIsEmailSent(true);
    } catch (err: any) { // Changed err type to any as per instruction
      toast.error("Failed to send reset code");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className={cn("space-y-6 text-center", className)}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Check your {isEmail ? "email" : "phone"}</h2>
          <p className="mt-2 text-sm text-gray-600">
            We sent a password reset code to {identifier}
          </p>
        </div>
        <button
          onClick={onBack}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90 btn-hover-effect"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </button>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email or phone number and we&apos;ll send you a reset code
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="text-sm font-medium text-gray-700">
            {isEmail ? "Email" : "Phone Number"}
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              {isEmail ? (
                <Mail className="h-5 w-5 text-gray-400" />
              ) : (
                <Phone className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <input
              id="identifier"
              type={isEmail ? "email" : "tel"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={isEmail ? "you@example.com" : "+91 98765 43210"}
              className={cn(
                "block w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm",
                "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary",
                error && "border-red-500 focus:ring-red-500"
              )}
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 btn-hover-effect"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Send Reset Code
        </button>
      </form>
    </div>
  );
}
