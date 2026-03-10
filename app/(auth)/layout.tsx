import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - KachraCash",
  description: "Sign in to your KachraCash account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
