"use client";

import { useState } from "react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { z } from "zod";
import { Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const magicLinkSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface MagicLinkFormProps {
  onSuccess?: () => void;
}

export function MagicLinkForm({ onSuccess }: MagicLinkFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<{ email?: string; form?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    setIsLoading(true);

    try {
      const validatedData = magicLinkSchema.parse({ email });
      // TODO: Connect to backend authentication for Magic Link
      console.log("Magic link requested for:", validatedData.email);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated network request

      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors = (err as any).errors;
        const firstError = errors[0];
        if (firstError) {
          setError({ email: firstError.message });
        }
      } else if (err instanceof Error) {
        setError({ form: err.message });
      } else {
        setError({ form: "An unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[180px] relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4 absolute inset-0"
          >
            <AuthInput
              label="Email Address"
              id="magic-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.email}
              disabled={isLoading}
            />
            {error.form && (
              <div aria-live="polite" className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
                {error.form}
              </div>
            )}
            <AuthButton type="submit" isLoading={isLoading} className="mt-2 text-[15px]">
              Send Magic Link
            </AuthButton>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-3 bg-[#EC4899]/5 rounded-2xl border border-[#EC4899]/20 p-6"
          >
            <div className="w-12 h-12 bg-[#EC4899]/10 rounded-full flex items-center justify-center text-[#EC4899] mb-1">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">Check your inbox</h3>
            <p className="text-sm text-gray-600">
              We&apos;ve sent a magic link to <span className="font-medium text-gray-900">{email}</span>
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-2 flex items-center text-sm font-medium text-[#EC4899] hover:text-[#D93B86] hover:underline"
            >
              Use a different email <ArrowRight className="ml-1 w-4 h-4 inline" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
