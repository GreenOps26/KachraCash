import { UnifiedAuth } from "@/components/auth";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 mesh-gradient">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm mb-4">
            <span className="text-2xl">♻️</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1F2937]">KachraCash</h1>
          <p className="text-[#1F2937]/70 mt-1 font-medium">Reset your password</p>
        </div>

        <UnifiedAuth />
      </div>
    </div>
  );
}
