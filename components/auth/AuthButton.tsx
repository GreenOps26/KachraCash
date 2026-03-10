import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ className, isLoading, variant = "primary", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "bg-[#EC4899] text-white shadow-md hover:bg-[#D93B86] focus:ring-[#EC4899] btn-hover-effect": variant === "primary",
            "bg-[#8B5CF6] text-white shadow-md hover:bg-[#7C3AED] focus:ring-[#8B5CF6] btn-hover-effect": variant === "secondary",
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200": variant === "outline",
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
AuthButton.displayName = "AuthButton";

export { AuthButton };
