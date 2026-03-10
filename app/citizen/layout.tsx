import Link from 'next/link';
import { Leaf, User, ListPlus, Wallet, Home, Sparkles, MapPin, Image as ImageIcon } from 'lucide-react';

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative z-0">
      <div className="fixed inset-0 pointer-events-none mesh-gradient" style={{ zIndex: -10 }} />
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/70 backdrop-blur-xl border-r border-white/50 p-6 flex flex-col gap-8 shadow-xl">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#EC4899]">
          <Leaf className="w-8 h-8" />
          KachraCash
        </Link>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/citizen/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <Home className="w-5 h-5 text-[#8B5CF6]" />
            Dashboard
          </Link>
          <Link href="/citizen/post-scrap" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <ListPlus className="w-5 h-5 text-[#EC4899]" />
            Post Scrap
          </Link>
          <Link href="/citizen/wallet" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <Wallet className="w-5 h-5 text-emerald-500" />
            Wallet
          </Link>

          <div className="mt-4 mb-2 px-4 text-xs font-bold text-[#1F2937]/40 uppercase tracking-wider">AI Features</div>

          <Link href="/citizen/ai/edit-image" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Edit Image
          </Link>
          <Link href="/citizen/ai/analyze-image" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <ImageIcon className="w-5 h-5 text-orange-500" />
            Analyze Scrap
          </Link>
          <Link href="/citizen/ai/maps" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <MapPin className="w-5 h-5 text-red-500" />
            Find Recyclers
          </Link>
        </nav>

        <div className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/50 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-bold">
            R
          </div>
          <div>
            <p className="font-bold text-sm">Raj Kumar</p>
            <p className="text-xs text-[#1F2937]/60">Citizen</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
