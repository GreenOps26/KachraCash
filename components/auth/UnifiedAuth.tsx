"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Lock, ArrowLeft } from "lucide-react";
import { GoogleButton } from "./GoogleButton";
import { PasswordForm } from "./PasswordForm";
import { MagicLinkForm } from "./MagicLinkForm";
import { PhoneForm } from "./PhoneForm";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AuthMethod = "primary" | "password" | "magic-link" | "phone";

export function UnifiedAuth({ className }: { className?: string }) {
  const [method, setMethod] = useState<AuthMethod>("primary");
  const [isLogin, setIsLogin] = useState(true);

  // Method switch wrapper providing a smooth transition
  const switchMethod = (newMethod: AuthMethod) => setMethod(newMethod);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const handleGoogleSuccess = () => toast.success("Google sign-in successful!");

  return (
    <div className={cn("w-full max-w-[420px] mx-auto", className)}>
      <motion.div
        className="glass-panel rounded-3xl p-6 md:p-8 w-full shadow-2xl overflow-hidden relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={method + (isLogin ? "login" : "signup")}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col w-full h-full"
          >
            {/* Header Area */}
            <div className="flex flex-col text-center mb-6 relative">
              {method !== "primary" && (
                <button
                  onClick={() => switchMethod("primary")}
                  className="absolute left-0 top-1 text-gray-500 hover:text-[#EC4899] transition-colors p-1 rounded-full hover:bg-gray-100"
                  aria-label="Back to main sign in options"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-[#1F2937]">
                {method === "primary" ? "Welcome to KachraCash" :
                 method === "password" ? `Sign ${isLogin ? "In" : "Up"} with Password` :
                 method === "magic-link" ? "Sign In with Email" : "Verify Phone"}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-sm text-gray-500 mt-2">
                {method === "primary" ? "Turn your waste into wallet today." :
                 method === "password" ? "Enter your details below." :
                 method === "magic-link" ? "We'll email you a magic link for a password-free sign in." :
                 "We'll text you a code. Standard rates apply."}
              </motion.p>
            </div>

            {/* Methods Area */}
            <motion.div variants={itemVariants} className="w-full">
              {method === "primary" && (
                <div className="flex flex-col space-y-4">
                  {/* Primary Method: Google */}
                  <GoogleButton onClick={() => toast.info("Google OAuth pending Supabase configuration")} />

                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-transparent px-2 text-gray-400 font-medium bg-white/40 rounded-full backdrop-blur-md">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Secondary Methods Stack */}
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => switchMethod("magic-link")}
                      className="flex items-center justify-center gap-2 w-full h-12 bg-white border border-gray-200 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/5 rounded-xl text-sm font-semibold text-gray-700 transition-all duration-200 group"
                    >
                      <Mail className="w-4 h-4 text-gray-500 group-hover:text-[#8B5CF6]" />
                      Email Magic Link
                    </button>

                    <button
                      onClick={() => switchMethod("password")}
                      className="flex items-center justify-center gap-2 w-full h-12 bg-white border border-gray-200 hover:border-[#EC4899] hover:bg-[#EC4899]/5 rounded-xl text-sm font-semibold text-gray-700 transition-all duration-200 group"
                    >
                      <Lock className="w-4 h-4 text-gray-500 group-hover:text-[#EC4899]" />
                      Password
                    </button>

                    <button
                      onClick={() => switchMethod("phone")}
                      className="flex items-center justify-center gap-2 w-full h-12 bg-white border border-gray-200 hover:border-[#F59E0B] hover:bg-[#F59E0B]/5 rounded-xl text-sm font-semibold text-gray-700 transition-all duration-200 group"
                    >
                      <Phone className="w-4 h-4 text-gray-500 group-hover:text-[#F59E0B]" />
                      Phone Number
                    </button>
                  </div>
                </div>
              )}

              {method === "password" && (
                <PasswordForm
                  onSuccess={() => toast.success("Welcome back!")}
                  onForgotPassword={() => toast.info("Reset password flow coming soon.")}
                />
              )}

              {method === "magic-link" && (
                <MagicLinkForm onSuccess={() => toast.success("Magic link sent!")} />
              )}

              {method === "phone" && (
                <PhoneForm onSuccess={() => toast.success("Phone verified successfully!")} />
              )}
            </motion.div>

            {/* Footer / Toggle Area */}
            {method === "primary" && (
              <motion.div variants={itemVariants} className="mt-8 text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-semibold text-[#EC4899] hover:underline focus:outline-none"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </motion.div>
            )}

            <motion.p variants={itemVariants} className="mt-6 text-center text-xs text-gray-400 w-full px-4">
              By continuing, you agree to our <a href="#" className="hover:text-gray-600 underline">Terms of Service</a> and <a href="#" className="hover:text-gray-600 underline">Privacy Policy</a>.
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
