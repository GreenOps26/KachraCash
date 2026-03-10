"use client";

import { useState, useRef, useEffect } from "react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const phoneSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number with country code"),
});

const otpSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

interface PhoneFormProps {
  onSuccess?: () => void;
}

export function PhoneForm({ onSuccess }: PhoneFormProps) {
  const [verifyState, setVerifyState] = useState<"input" | "loading" | "otp" | "verifying">("input");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<{ phone?: string; otp?: string; form?: string }>({});

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus first input when switching to OTP view
  useEffect(() => {
    if (verifyState === "otp") {
      otpInputRefs[0].current?.focus();
    }
  }, [verifyState]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    setVerifyState("loading");

    try {
      const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`; // Default to India optionally
      phoneSchema.parse({ phone: formattedPhone });

      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setPhoneNumber(formattedPhone); // Store the normalized phone
      setVerifyState("otp");
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors = (err as any).errors;
        const firstError = errors[0];
        if (firstError) {
          setError({ phone: firstError.message });
        }
      } else {
        setError({ form: "Failed to send code. Please check your number." });
      }
      setVerifyState("input");
    }
  };

  const verifyOtp = async (code: string) => {
    setVerifyState("verifying");
    setError({});

    try {
      otpSchema.parse({ code });

      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulated fail condition for demonstration length
      if (code === "000000") throw new Error("Invalid testing code");

      // Success
      if (onSuccess) onSuccess();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors = (err as any).errors;
        const firstError = errors[0];
        if (firstError) {
          setError({ otp: firstError.message });
        }
      } else if (err instanceof Error) {
        setError({ otp: err.message });
      }
      setVerifyState("otp");
      // Clear fields and re-focus on error
      setOtp(["", "", "", "", "", ""]);
      otpInputRefs[0].current?.focus();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Take the last character if multiple are entered
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance
    if (digit && index < 5) {
      otpInputRefs[index + 1].current?.focus();
    }

    // Submit if complete
    const currentCode = newOtp.join("");
    if (currentCode.length === 6) {
      verifyOtp(currentCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="w-full relative min-h-[180px]">
      <AnimatePresence mode="wait">
        {verifyState === "input" || verifyState === "loading" ? (
          <motion.form
            key="phone-input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handlePhoneSubmit}
            className="space-y-4 w-full"
          >
            <AuthInput
              label="Phone Number"
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={error.phone}
              disabled={verifyState === "loading"}
            />
            {error.form && (
              <div aria-live="polite" className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
                {error.form}
              </div>
            )}
            <AuthButton type="submit" isLoading={verifyState === "loading"} className="mt-2 text-[15px]">
              Send Code
            </AuthButton>
          </motion.form>
        ) : (
          <motion.div
            key="otp-input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 w-full flex flex-col items-center"
          >
            <div className="text-center w-full">
              <h3 className="text-sm font-medium text-gray-900 mb-1">Enter Verification Code</h3>
              <p className="text-xs text-gray-500 mb-4 tracking-tight leading-relaxed">
                Code sent to <span className="font-semibold">{phoneNumber}</span>{" "}
                <button
                  type="button"
                  onClick={() => {
                    setVerifyState("input");
                    setOtp(["", "", "", "", "", ""]);
                    setError({});
                  }}
                  className="text-[#EC4899] hover:underline whitespace-nowrap"
                >
                  Edit
                </button>
              </p>

              <div className="flex gap-2 justify-center w-full px-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={otpInputRefs[i]}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    disabled={verifyState === "verifying"}
                    className={`w-11 h-12 md:w-12 md:h-14 text-center text-lg md:text-xl font-bold rounded-xl border ${
                      error.otp ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
                    } focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/20 focus:outline-none transition-all disabled:opacity-50`}
                  />
                ))}
              </div>

              <div aria-live="polite" className="mt-2 min-h-[20px]">
                {error.otp && (
                  <p className="text-sm text-red-500 font-medium shake block w-full text-center">
                    {error.otp}
                  </p>
                )}
              </div>
            </div>

            <AuthButton
              type="button"
              disabled={verifyState === "verifying" || otp.join("").length !== 6}
              isLoading={verifyState === "verifying"}
              onClick={() => verifyOtp(otp.join(""))}
              className="mt-2 text-[15px] w-full"
            >
              Verify Code
            </AuthButton>

            <p className="text-xs text-gray-500 text-center w-full mt-4">
              Didn't receive it?{" "}
              <button
                type="button"
                onClick={handlePhoneSubmit}
                disabled={verifyState === "verifying"}
                className="font-medium text-gray-900 hover:text-[#EC4899] disabled:opacity-50 focus:outline-none"
              >
                Resend
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
