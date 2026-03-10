import Link from 'next/link';
import { Leaf, Truck, Map, IndianRupee, Home } from 'lucide-react';

export default function KabadiwalaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative z-0">
      <div className="fixed inset-0 pointer-events-none mesh-gradient" style={{ zIndex: -10 }} />
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col gap-8 shadow-2xl relative z-10">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-[#8B5CF6]">
          <Leaf className="w-8 h-8" />
          KachraCash
        </Link>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/kabadiwala/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <Home className="w-5 h-5 text-[#8B5CF6]" />
            Dashboard
          </Link>
          <Link href="/kabadiwala/map" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <Map className="w-5 h-5 text-[#EC4899]" />
            Find Scrap
          </Link>
          <Link href="/kabadiwala/earnings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEF3C7]/50 text-[#1F2937] font-semibold transition-colors">
            <IndianRupee className="w-5 h-5 text-emerald-500" />
            Earnings
          </Link>
        </nav>

        <div className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/50 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#EC4899] flex items-center justify-center text-white font-bold">
            R
          </div>
          <div>
            <p className="font-bold text-sm">Raju Bhai</p>
            <p className="text-xs text-[#1F2937]/60">Kabadiwala</p>
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
